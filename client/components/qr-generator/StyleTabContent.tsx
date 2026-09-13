"use client";

import { useTranslations } from "next-intl";
import ColorField from "@/components/qr-generator/ColorField";
import ShapeThumb from "@/components/qr-generator/ShapeThumb";
import { cn } from "@/utils/cn";
import { contrastRatio, QR_SHAPE_PRESETS } from "@/lib/qr/styling";
import { useQrGeneratorStore } from "@/stores/useQrGeneratorStore";

export default function StyleTabContent() {
  const t = useTranslations("qrTool");
  const shapeId = useQrGeneratorStore((state) => state.shapeId);
  const fgColor = useQrGeneratorStore((state) => state.fgColor);
  const bgColor = useQrGeneratorStore((state) => state.bgColor);
  const fgInput = useQrGeneratorStore((state) => state.fgInput);
  const bgInput = useQrGeneratorStore((state) => state.bgInput);
  const setShapeId = useQrGeneratorStore((state) => state.setShapeId);
  const setFgInput = useQrGeneratorStore((state) => state.setFgInput);
  const setBgInput = useQrGeneratorStore((state) => state.setBgInput);
  const commitHex = useQrGeneratorStore((state) => state.commitHex);

  const lowContrast = contrastRatio(fgColor, bgColor) < 3;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {QR_SHAPE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            data-testid={`qr-shape-${preset.id}`}
            aria-label={t(`shapes.${preset.id}`)}
            aria-pressed={shapeId === preset.id}
            onClick={() => setShapeId(preset.id)}
            className={cn(
              "size-16 rounded-xl border-2 p-1.5 bg-white",
              shapeId === preset.id
                ? "border-accent-500"
                : "border-sky-100 dark:border-slate-600 hover:border-accent-300",
            )}
          >
            <ShapeThumb preset={preset} color={fgColor} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorField
          label={t("qrColor")}
          testId="qr-color-fg"
          value={fgInput}
          onTextChange={setFgInput}
          onCommit={() => commitHex("fg", fgInput)}
          onPicker={(value) => commitHex("fg", value)}
        />
        <ColorField
          label={t("bgColor")}
          testId="qr-color-bg"
          value={bgInput}
          onTextChange={setBgInput}
          onCommit={() => commitHex("bg", bgInput)}
          onPicker={(value) => commitHex("bg", value)}
        />
      </div>
      {lowContrast && (
        <p
          data-testid="qr-contrast-warning"
          className="text-sm text-amber-700 dark:text-amber-400"
        >
          {t("contrastWarning")}
        </p>
      )}
    </div>
  );
}
