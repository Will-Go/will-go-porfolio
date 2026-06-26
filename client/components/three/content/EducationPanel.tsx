"use client";

import { useTranslations } from "next-intl";

export function EducationPanel() {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        <h2 className="text-xl font-bold text-white">{t("education.title")}</h2>
      </div>
      <p className="text-xs text-gray-400">{t("education.subtitle")}</p>
      <div className="p-3 rounded-xl bg-white/5 border border-accent-500/10 space-y-2">
        <div>
          <p className="text-sm font-semibold text-white">
            {t("education.university")}
          </p>
          <p className="text-xs text-accent-500">{t("education.degree")}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300">
            📅 {t("education.period")}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300">
            📍 {t("education.location")}
          </span>
          <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400">
            ✓ {t("education.progress")}
          </span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-accent-500 uppercase tracking-wider mb-2">
          {t("education.focusLabel")}
        </p>
        <div className="flex flex-wrap gap-1">
          {(t.raw("education.focus") as string[]).map((f: string) => (
            <span
              key={f}
              className="px-2 py-0.5 text-[10px] bg-accent-500/5 border border-accent-500/15 rounded-full text-gray-300"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
