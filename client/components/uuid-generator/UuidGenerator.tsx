"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import CopyAction from "@/components/uuid-generator/CopyAction";
import CountControl from "@/components/uuid-generator/CountControl";
import FormatToggles from "@/components/uuid-generator/FormatToggles";
import NameBasedFields from "@/components/uuid-generator/NameBasedFields";
import UuidInspector from "@/components/uuid-generator/UuidInspector";
import VersionPills from "@/components/uuid-generator/VersionPills";
import { cn } from "@/utils/cn";
import {
  DEFAULT_UUID_FORMAT,
  MAX_UUID_COUNT,
  MIN_UUID_COUNT,
  UUID_NAMESPACES,
  clampCount,
  decodeUuid,
  formatUuid,
  generateUuids,
  isBulkLockedVersion,
  isConstantVersion,
  isNameBasedVersion,
  joinUuids,
  normalizeUuid,
  parseCount,
  type IUuidFormatOptions,
  type UuidBulkSeparator,
  type UuidNamespacePreset,
  type UuidVersionId,
} from "@/lib/uuid";

export default function UuidGenerator() {
  const t = useTranslations("uuidTool");
  const shouldReduceMotion = useReducedMotion();
  const countRef = useRef(1);
  const previousVersion = useRef<UuidVersionId>("v4");

  const [version, setVersion] = useState<UuidVersionId>("v4");
  const [canonicals, setCanonicals] = useState<string[]>([]);
  const [countInput, setCountInput] = useState("1");
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<IUuidFormatOptions>(DEFAULT_UUID_FORMAT);
  const [separator, setSeparator] = useState<UuidBulkSeparator>("newline");
  const [namespacePreset, setNamespacePreset] =
    useState<UuidNamespacePreset>("dns");
  const [customNamespace, setCustomNamespace] = useState("");
  const [name, setName] = useState("www.example.com");
  const [countError, setCountError] = useState("");
  const [namespaceError, setNamespaceError] = useState("");
  const [status, setStatus] = useState("");
  const [heroCopied, setHeroCopied] = useState(false);
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeTouched, setDecodeTouched] = useState(false);

  countRef.current = count;

  const resolvedNamespace =
    namespacePreset === "custom"
      ? customNamespace
      : UUID_NAMESPACES[namespacePreset];
  const bulkLocked = isBulkLockedVersion(version);
  const formatted = useMemo(
    () => canonicals.map((value) => formatUuid(value, format)),
    [canonicals, format],
  );
  const primaryFormatted = formatted[0] ?? "";
  const bulkText = joinUuids(formatted, separator);
  const jsonText = JSON.stringify(formatted);
  const pastedDecode = decodeInput.trim() ? decodeUuid(decodeInput) : null;
  const pasteError =
    decodeTouched && decodeInput.trim() && !pastedDecode?.isValid
      ? t("inspector.invalid")
      : "";
  const inspectorSource = pastedDecode?.isValid
    ? pastedDecode
    : canonicals[0]
      ? decodeUuid(canonicals[0])
      : null;

  const runGenerate = useCallback(
    async (nextCount: number): Promise<void> => {
      if (isNameBasedVersion(version)) {
        if (!normalizeUuid(resolvedNamespace)) {
          setNamespaceError(t("nameBased.customError"));
          return;
        }
        setNamespaceError("");
      }

      const safeCount = bulkLocked ? 1 : clampCount(nextCount);
      const values = await generateUuids(
        {
          version,
          namespace: resolvedNamespace,
          name,
        },
        safeCount,
      );
      setCanonicals(values);
      setStatus(t("status.generated", { count: values.length }));
    },
    [bulkLocked, name, resolvedNamespace, t, version],
  );

  useEffect(() => {
    const versionChanged = previousVersion.current !== version;
    previousVersion.current = version;
    const delay =
      isNameBasedVersion(version) && !versionChanged ? 160 : 0;
    const handle = window.setTimeout(() => {
      void runGenerate(countRef.current);
    }, delay);
    return () => window.clearTimeout(handle);
  }, [name, resolvedNamespace, runGenerate, version]);

  function applyCount(next: number): void {
    const clamped = clampCount(next);
    setCount(clamped);
    setCountInput(String(clamped));
    setCountError("");
  }

  function handleVersionChange(next: UuidVersionId): void {
    setVersion(next);
    setCanonicals([]);
    if (isBulkLockedVersion(next)) {
      applyCount(1);
    }
  }

  function handleCountInput(raw: string): void {
    setCountInput(raw);
    setCountError("");
    const parsed = parseCount(raw);
    if (parsed !== null) {
      setCount(clampCount(parsed));
    }
  }

  function handleGenerate(): void {
    const parsed = parseCount(countInput);
    if (parsed === null) {
      setCountError(t("count.errorInvalid"));
      return;
    }
    if (parsed < MIN_UUID_COUNT) {
      setCountError(t("count.errorMin"));
      return;
    }
    if (parsed > MAX_UUID_COUNT) {
      setCountError(t("count.errorMax"));
      return;
    }
    applyCount(parsed);
    void runGenerate(parsed);
  }

  function handlePreset(next: number): void {
    applyCount(next);
    void runGenerate(next);
  }

  async function copyHero(): Promise<void> {
    if (!primaryFormatted) return;
    try {
      await navigator.clipboard.writeText(primaryFormatted);
      setHeroCopied(true);
      setStatus(t("status.copiedOne"));
      window.setTimeout(() => setHeroCopied(false), 2000);
    } catch {
      // Keep the control available if clipboard access is denied.
    }
  }

  function downloadTxt(): void {
    if (!bulkText) return;
    const blob = new Blob([bulkText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `uuids-${version}-${formatted.length}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus(t("status.downloaded"));
  }

  return (
    <main className="relative min-h-dvh p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <div
        aria-live="polite"
        className="sr-only"
      >
        {status}
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        <Reveal animationType="slideDown" duration={0.6} easing="easeOut">
          <div className="space-y-4">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gray-600 dark:text-primary-400 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-500 transition-colors duration-150"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("backToApps")}
            </Link>
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-600 dark:text-primary-400 max-w-2xl mx-auto">
                {t(`hints.${version}`)}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal animationType="fadeUp" delay={0.08} duration={0.5}>
          <VersionPills
            value={version}
            onChange={handleVersionChange}
            label={t("versionLabel")}
            getName={(id) => t(`versions.${id}`)}
          />
        </Reveal>

        <Reveal animationType="fadeUp" delay={0.12} duration={0.5}>
          <section className="rounded-2xl border border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900/60 p-5 md:p-8 shadow-sm space-y-5">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-primary-400">
              {t("yourUuid", { label: t(`versionNames.${version}`) })}
            </p>
            <button
              type="button"
              data-testid="uuid-hero"
              onClick={() => void copyHero()}
              disabled={!primaryFormatted}
              aria-label={heroCopied ? t("copied") : t("clickToCopy")}
              className={cn(
                "w-full min-h-[5.5rem] rounded-2xl px-4 py-6 text-center cursor-pointer touch-manipulation",
                "bg-gray-50 dark:bg-primary-950/50 border border-gray-200 dark:border-primary-800",
                "transition-[transform,border-color,background-color] duration-150",
                "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                "disabled:cursor-default",
                "[@media(hover:hover)_and_(pointer:fine)]:hover:border-accent-500/50",
              )}
            >
              {primaryFormatted ? (
                <motion.span
                  key={canonicals[0]}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(2px)" }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, filter: "blur(0px)" }
                  }
                  transition={{
                    duration: 0.18,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="block font-mono text-lg sm:text-2xl md:text-3xl break-all text-gray-900 dark:text-primary-50 tracking-tight"
                >
                  {primaryFormatted}
                </motion.span>
              ) : (
                <span className="block h-8 max-w-xl mx-auto rounded-md bg-gray-200/80 dark:bg-primary-800/70 animate-pulse" />
              )}
              <span className="mt-3 block text-sm text-gray-500 dark:text-primary-500">
                {heroCopied ? t("copied") : t("clickToCopy")}
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <CopyAction
                text={primaryFormatted}
                label={t("copy")}
                copiedLabel={t("copied")}
                variant="primary"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerate}
                disabled={isConstantVersion(version)}
                title={
                  isConstantVersion(version) ? t("constantHint") : undefined
                }
                className={cn(
                  "h-11 rounded-xl px-4 cursor-pointer touch-manipulation",
                  "border border-gray-200 dark:border-primary-700",
                  "bg-white dark:bg-primary-900 text-gray-800 dark:text-primary-100",
                  "transition-[transform,background-color] duration-150 active:scale-[0.97]",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                )}
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                {t("generate")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={downloadTxt}
                disabled={formatted.length === 0}
                className={cn(
                  "h-11 rounded-xl px-4 cursor-pointer touch-manipulation",
                  "border border-gray-200 dark:border-primary-700",
                  "bg-white dark:bg-primary-900 text-gray-800 dark:text-primary-100",
                  "transition-[transform,background-color] duration-150 active:scale-[0.97]",
                )}
              >
                <Download className="size-4" aria-hidden="true" />
                {t("download")}
              </Button>
              <CopyAction
                text={jsonText}
                label={t("copyJson")}
                copiedLabel={t("copied")}
                variant="outline"
                disabled={formatted.length === 0}
              />
            </div>
            {isConstantVersion(version) && (
              <p className="text-center text-sm text-gray-500 dark:text-primary-500">
                {t("constantHint")}
              </p>
            )}
          </section>
        </Reveal>

        {isNameBasedVersion(version) && (
          <Reveal animationType="fadeUp" duration={0.45}>
            <section className="rounded-2xl border border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900/60 p-5 md:p-8 shadow-sm">
              <NameBasedFields
                namespacePreset={namespacePreset}
                onNamespacePresetChange={setNamespacePreset}
                customNamespace={customNamespace}
                onCustomNamespaceChange={(value) => {
                  setCustomNamespace(value);
                  setNamespaceError("");
                }}
                name={name}
                onNameChange={setName}
                customError={namespaceError}
                labels={{
                  title: t("nameBased.title"),
                  helper: t("nameBased.helper"),
                  namespace: t("nameBased.namespace"),
                  dns: t("nameBased.dns"),
                  url: t("nameBased.url"),
                  oid: t("nameBased.oid"),
                  x500: t("nameBased.x500"),
                  custom: t("nameBased.custom"),
                  customLabel: t("nameBased.customLabel"),
                  customPlaceholder: t("nameBased.customPlaceholder"),
                  name: t("nameBased.name"),
                  namePlaceholder: t("nameBased.namePlaceholder"),
                  nameHelper: t("nameBased.nameHelper"),
                }}
              />
            </section>
          </Reveal>
        )}

        <Reveal animationType="fadeUp" delay={0.16} duration={0.5}>
          <section className="rounded-2xl border border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900/60 p-5 md:p-8 shadow-sm space-y-8">
            <FormatToggles
              value={format}
              onChange={setFormat}
              separator={separator}
              onSeparatorChange={setSeparator}
              showSeparator={formatted.length > 1}
              labels={{
                title: t("format.title"),
                uppercase: t("format.uppercase"),
                hyphens: t("format.hyphens"),
                braces: t("format.braces"),
                urn: t("format.urn"),
                guidPreset: t("format.guidPreset"),
                separator: t("format.separator"),
                newline: t("format.newline"),
                comma: t("format.comma"),
              }}
            />
            <CountControl
              value={countInput}
              onChange={handleCountInput}
              onStep={(delta) => {
                const next = clampCount((Number.isFinite(count) ? count : 1) + delta);
                applyCount(next);
              }}
              onPreset={handlePreset}
              onGenerate={handleGenerate}
              disabled={bulkLocked}
              error={countError}
              labels={{
                label: t("count.label"),
                helper: bulkLocked
                  ? t("count.lockedHelper")
                  : t("count.helper"),
                decrease: t("count.decrease"),
                increase: t("count.increase"),
              }}
            />
          </section>
        </Reveal>

        {formatted.length > 1 && (
          <Reveal animationType="fadeUp" duration={0.45}>
            <section className="rounded-2xl border border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900/60 p-5 md:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-primary-100">
                  {t("bulk.title")}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyAction
                    text={bulkText}
                    label={t("copyAll")}
                    copiedLabel={t("copied")}
                    variant="primary"
                  />
                  <span className="text-sm text-gray-500 dark:text-primary-500">
                    {t("bulk.total", { count: formatted.length })}
                  </span>
                </div>
              </div>
              <textarea
                readOnly
                value={bulkText}
                aria-label={t("bulk.title")}
                className="w-full min-h-[200px] max-h-[400px] rounded-xl border border-gray-200 dark:border-primary-800 bg-gray-50 dark:bg-primary-950/40 p-4 font-mono text-sm text-gray-800 dark:text-primary-100"
              />
            </section>
          </Reveal>
        )}

        <Reveal animationType="fadeUp" delay={0.2} duration={0.5}>
          <section className="rounded-2xl border border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900/60 p-5 md:p-8 shadow-sm">
            <UuidInspector
              decoded={inspectorSource}
              pasteValue={decodeInput}
              onPasteChange={(value) => {
                setDecodeInput(value);
                setDecodeTouched(false);
              }}
              onPasteBlur={() => setDecodeTouched(true)}
              pasteError={pasteError}
              labels={{
                title: t("inspector.title"),
                version: t("inspector.version"),
                variant: t("inspector.variant"),
                timestamp: t("inspector.timestamp"),
                clockSequence: t("inspector.clockSequence"),
                node: t("inspector.node"),
                canonical: t("inspector.canonical"),
                pasteLabel: t("inspector.pasteLabel"),
                pastePlaceholder: t("inspector.pastePlaceholder"),
                empty: t("inspector.empty"),
                rfc: t("inspector.rfc"),
                nil: t("inspector.nil"),
                max: t("inspector.max"),
                variantRfc: t("inspector.variantRfc"),
                variantNcs: t("inspector.variantNcs"),
                variantMicrosoft: t("inspector.variantMicrosoft"),
                variantUnknown: t("inspector.variantUnknown"),
              }}
            />
          </section>
        </Reveal>

        <Reveal animationType="scale" delay={0.24} duration={0.5} easing="easeOut">
          <section className="rounded-2xl border border-accent-500/15 dark:border-accent-500/20 bg-white/40 dark:bg-primary-900/40 p-6 md:p-8 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-primary-200">
              {t("about.title", { label: t(`versionNames.${version}`) })}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-primary-400">
              {t(`about.${version}.body`)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 dark:bg-primary-950/40 p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-primary-200">
                  {t("about.use")}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-primary-400">
                  {t(`about.${version}.use`)}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-primary-950/40 p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-primary-200">
                  {t("about.avoid")}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-primary-400">
                  {t(`about.${version}.avoid`)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-primary-500">
              {t("privacy")}
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
