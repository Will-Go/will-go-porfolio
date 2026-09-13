"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";
import { FIELD_CLASS, LABEL_CLASS } from "@/components/qr-generator/styles";
import { useQrGeneratorStore } from "@/stores/useQrGeneratorStore";

export default function ContentFields() {
  const t = useTranslations("qrTool");
  const type = useQrGeneratorStore((state) => state.contentType);
  const form = useQrGeneratorStore((state) => state.form);
  const patchForm = useQrGeneratorStore((state) => state.patchForm);

  if (type === "text") {
    return (
      <>
        <label className={LABEL_CLASS} htmlFor="qr-text">
          {t("fields.text")}
        </label>
        <textarea
          id="qr-text"
          rows={5}
          maxLength={1000}
          value={form.text}
          onChange={(event) => patchForm("text", event.target.value)}
          placeholder={t("placeholders.text")}
          className={cn(FIELD_CLASS, "resize-y min-h-30")}
        />
        <p className="text-sm text-gray-400 dark:text-primary-500">
          {t("textCount", { count: form.text.length })}
        </p>
      </>
    );
  }

  return (
    <>
      <label className={LABEL_CLASS} htmlFor="qr-url">
        {t("fields.websiteUrl")}
      </label>
      <textarea
        id="qr-url"
        rows={3}
        value={form.url}
        onChange={(event) => patchForm("url", event.target.value)}
        placeholder={t("placeholders.websiteUrl")}
        className={cn(FIELD_CLASS, "resize-none")}
      />
      <p className="text-sm text-gray-400 dark:text-primary-500">
        {t("autoGenerate")}
      </p>
    </>
  );
}
