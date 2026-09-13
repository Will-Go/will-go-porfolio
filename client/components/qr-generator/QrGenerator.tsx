"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type QRCodeStyling from "qr-code-styling";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContentFields from "@/components/qr-generator/ContentFields";
import EmptyQrMark from "@/components/qr-generator/EmptyQrMark";
import FrameShell from "@/components/qr-generator/FrameShell";
import FrameTabContent from "@/components/qr-generator/FrameTabContent";
import LogoTabContent from "@/components/qr-generator/LogoTabContent";
import StyleTabContent from "@/components/qr-generator/StyleTabContent";
import { useDebounce } from "@/hooks/debounce";
import { cn } from "@/utils/cn";
import {
  buildQrPayload,
  hasQrPayload,
  type QrContentType,
} from "@/lib/qr/buildPayload";
import { composeFramedImage, triggerBlobDownload } from "@/lib/qr/frames";
import {
  buildQrOptions,
  EXPORT_QR_SIZE,
  PREVIEW_QR_SIZE,
  QR_SHAPE_PRESETS,
  resolveLogoSrc,
} from "@/lib/qr/styling";
import {
  type QrDesignTab,
  useQrGeneratorStore,
} from "@/stores/useQrGeneratorStore";
import { FaChevronDown, FaDownload, FaFont, FaGlobe } from "react-icons/fa";

type DownloadFormat = "png" | "jpeg" | "svg";

export default function QrGenerator() {
  const t = useTranslations("qrTool");
  const contentType = useQrGeneratorStore((state) => state.contentType);
  const form = useQrGeneratorStore((state) => state.form);
  const frame = useQrGeneratorStore((state) => state.frame);
  const logoPreset = useQrGeneratorStore((state) => state.logoPreset);
  const customLogo = useQrGeneratorStore((state) => state.customLogo);
  const shapeId = useQrGeneratorStore((state) => state.shapeId);
  const fgColor = useQrGeneratorStore((state) => state.fgColor);
  const bgColor = useQrGeneratorStore((state) => state.bgColor);
  const designTab = useQrGeneratorStore((state) => state.designTab);
  const setContentType = useQrGeneratorStore((state) => state.setContentType);
  const setDesignTab = useQrGeneratorStore((state) => state.setDesignTab);

  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("png");
  const [formatMenuOpen, setFormatMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const mountRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<QRCodeStyling | null>(null);
  const formatMenuRef = useRef<HTMLDivElement>(null);

  const shape = useMemo(
    () =>
      QR_SHAPE_PRESETS.find((item) => item.id === shapeId) ??
      QR_SHAPE_PRESETS[0],
    [shapeId],
  );

  const payload = useMemo(
    () => buildQrPayload(contentType, form),
    [contentType, form],
  );
  const canGenerate = hasQrPayload(contentType, form);
  const debouncedPayload = useDebounce(payload, 160);
  const scanLabel = t("scanMe");
  const logoSrc = useMemo(
    () =>
      resolveLogoSrc({
        preset: logoPreset,
        customSrc: customLogo,
        color: fgColor,
        scanLabel,
      }),
    [logoPreset, customLogo, fgColor, scanLabel],
  );

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (
        formatMenuRef.current &&
        !formatMenuRef.current.contains(event.target as Node)
      ) {
        setFormatMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!canGenerate || !debouncedPayload) return;

    let cancelled = false;
    const options = buildQrOptions({
      data: debouncedPayload,
      size: PREVIEW_QR_SIZE,
      fgColor,
      bgColor,
      shape,
      image: logoSrc,
    });

    const sync = async () => {
      if (!instanceRef.current) {
        const mod = await import("qr-code-styling");
        if (cancelled || !mountRef.current) return;
        const QRCodeStylingCtor = mod.default;
        mountRef.current.innerHTML = "";
        instanceRef.current = new QRCodeStylingCtor(options);
        instanceRef.current.append(mountRef.current);
        return;
      }
      instanceRef.current.update(options);
      if (mountRef.current && mountRef.current.childElementCount === 0) {
        instanceRef.current.append(mountRef.current);
      }
    };

    void sync();
    return () => {
      cancelled = true;
    };
  }, [bgColor, canGenerate, debouncedPayload, fgColor, logoSrc, shape]);

  const handleDownload = async (format: DownloadFormat) => {
    if (!canGenerate || !debouncedPayload) return;
    setIsDownloading(true);
    setDownloadError("");
    setFormatMenuOpen(false);
    try {
      const mod = await import("qr-code-styling");
      const exportQr = new mod.default(
        buildQrOptions({
          data: debouncedPayload,
          size: EXPORT_QR_SIZE,
          fgColor,
          bgColor,
          shape,
          image: logoSrc,
        }),
      );
      const caption = t("scanMe");
      if (format === "svg") {
        const raw = await exportQr.getRawData("svg");
        if (!(raw instanceof Blob)) throw new Error(t("downloadFailed"));
        triggerBlobDownload(raw, "qr-code.svg");
        return;
      }
      const raw = await exportQr.getRawData("png");
      if (!(raw instanceof Blob)) throw new Error(t("downloadFailed"));
      const framed = await composeFramedImage(
        raw,
        frame,
        format,
        caption,
        fgColor,
      );
      const ext = format === "jpeg" ? "jpg" : "png";
      triggerBlobDownload(framed, `qr-code.${ext}`);
    } catch {
      setDownloadError(t("downloadFailed"));
    } finally {
      setIsDownloading(false);
    }
  };

  const types: {
    id: QrContentType;
    label: string;
    icon: ReactNode;
  }[] = [
    { id: "website", label: t("types.website"), icon: <FaGlobe /> },
    { id: "text", label: t("types.text"), icon: <FaFont /> },
  ];

  const designTabs: {
    id: QrDesignTab;
    label: string;
  }[] = [
    { id: "frame", label: t("tabs.frame") },
    { id: "logo", label: t("tabs.logo") },
    { id: "style", label: t("tabs.style") },
  ];

  const downloadLabel =
    downloadFormat === "jpeg"
      ? t("downloadJpg")
      : downloadFormat === "svg"
        ? t("downloadSvg")
        : t("downloadPng");

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <Reveal animationType="slideDown" duration={0.8} easing="backOut">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-primary-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal animationType="fadeUp" delay={0.15} duration={0.8}>
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-primary-800 shadow-xl bg-slate-100 dark:bg-primary-950/40">
            <div className="bg-slate-800 dark:bg-primary-950 px-2 py-2 overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                {types.map((item) => {
                  const active = contentType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-testid={`qr-type-${item.id}`}
                      aria-pressed={active}
                      onClick={() => setContentType(item.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-colors",
                        active
                          ? "bg-white/15 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/10",
                      )}
                    >
                      <span className="text-sm">{item.icon}</span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-5 p-4 md:p-6">
              <div className="min-w-0">
                <Accordion
                  type="multiple"
                  defaultValue={["content", "design"]}
                  className="space-y-5"
                >
                  <AccordionItem
                    value="content"
                    className="rounded-2xl border border-gray-100 bg-white px-5 shadow-sm last:border-b last:border-gray-100 dark:border-primary-800 dark:last:border-primary-800 dark:bg-primary-900 md:px-6"
                  >
                    <AccordionTrigger
                      data-testid="qr-accordion-content"
                      className="py-5 text-sm font-bold tracking-[0.18em] text-slate-800 hover:no-underline dark:text-primary-100"
                    >
                      {t("content")}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="space-y-4">
                        <ContentFields />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="design"
                    className="rounded-2xl border border-gray-100 bg-white px-5 shadow-sm last:border-b last:border-gray-100 dark:border-primary-800 dark:last:border-primary-800 dark:bg-primary-900 md:px-6"
                  >
                    <AccordionTrigger
                      data-testid="qr-accordion-design"
                      className="py-5 text-sm font-bold tracking-[0.18em] text-slate-800 hover:no-underline dark:text-primary-100"
                    >
                      {t("design")}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-primary-800">
                        {designTabs.map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            data-testid={`qr-design-tab-${tab.id}`}
                            aria-pressed={designTab === tab.id}
                            onClick={() => setDesignTab(tab.id)}
                            className={cn(
                              "relative pb-3 text-sm font-semibold transition-colors",
                              designTab === tab.id
                                ? "text-accent-600 dark:text-accent-400"
                                : "text-gray-500 dark:text-primary-400 hover:text-gray-800 dark:hover:text-primary-200",
                            )}
                          >
                            {tab.label}
                            {designTab === tab.id && (
                              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-500" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="pt-5">
                        {designTab === "frame" && <FrameTabContent />}
                        {designTab === "logo" && <LogoTabContent />}
                        {designTab === "style" && <StyleTabContent />}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <aside className="lg:sticky lg:top-24 h-fit flex flex-col items-center gap-6 py-2">
                <div
                  data-testid="qr-preview"
                  className="w-[240px] min-h-[240px] flex items-center justify-center"
                  aria-live="polite"
                >
                  {canGenerate ? (
                    <FrameShell frame={frame} caption={t("scanMe")}>
                      <div ref={mountRef} className="[&_canvas]:block" />
                    </FrameShell>
                  ) : (
                    <div className="size-[220px] rounded-md bg-[linear-gradient(45deg,#e8eefc_25%,transparent_25%,transparent_50%,#e8eefc_50%,#e8eefc_75%,transparent_75%,transparent)] bg-[length:16px_16px] opacity-70 flex items-center justify-center">
                      <div
                        className="size-[180px] opacity-40"
                        aria-hidden="true"
                      >
                        <EmptyQrMark />
                      </div>
                    </div>
                  )}
                </div>

                <div
                  ref={formatMenuRef}
                  className="relative w-full max-w-[240px]"
                >
                  <div className="flex rounded-full overflow-hidden border border-slate-200 dark:border-primary-700 bg-slate-100 dark:bg-primary-900 shadow-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={!canGenerate || isDownloading}
                      onClick={() => handleDownload(downloadFormat)}
                      className="flex-1 rounded-none h-11 text-slate-600 dark:text-primary-200 hover:bg-slate-200/80 dark:hover:bg-primary-800"
                    >
                      <FaDownload />
                      {isDownloading ? t("downloading") : downloadLabel}
                    </Button>
                    <button
                      type="button"
                      aria-label={t("downloadFormats")}
                      aria-expanded={formatMenuOpen}
                      disabled={!canGenerate || isDownloading}
                      onClick={() => setFormatMenuOpen((open) => !open)}
                      className="w-11 border-l border-slate-200 dark:border-primary-700 text-slate-500 hover:bg-slate-200/80 dark:hover:bg-primary-800 disabled:opacity-50"
                    >
                      <FaChevronDown className="mx-auto" />
                    </button>
                  </div>
                  {formatMenuOpen && (
                    <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 dark:border-primary-700 bg-white dark:bg-primary-900 shadow-lg overflow-hidden z-10">
                      {(
                        [
                          ["png", t("downloadPng")],
                          ["jpeg", t("downloadJpg")],
                          ["svg", t("downloadSvg")],
                        ] as const
                      ).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setDownloadFormat(id);
                            void handleDownload(id);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-primary-200 hover:bg-gray-50 dark:hover:bg-primary-800"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!canGenerate && (
                  <p className="text-center text-sm text-gray-500 dark:text-primary-500 max-w-[240px]">
                    {t("emptyHint")}
                  </p>
                )}
                {downloadError && (
                  <p className="text-center text-sm text-red-500">
                    {downloadError}
                  </p>
                )}
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
