"use client";

import { useTranslations } from "next-intl";

export function AboutPanel() {
  const t = useTranslations();
  const CORE = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Supabase",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        <h2 className="text-xl font-bold text-white">{t("about.title")}</h2>
      </div>
      <p className="text-xs text-gray-400">{t("about.subtitle")}</p>
      <p className="text-xs text-gray-300 leading-relaxed">
        {t("about.intro")}
      </p>
      <div>
        <p className="text-[10px] font-semibold text-accent-500 uppercase tracking-wider mb-2">
          {t("about.coreStack")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {CORE.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 text-[11px] bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-accent-500/10">
        {[
          { v: "3+", l: t("about.stats.years") },
          { v: "15+", l: t("about.stats.projects") },
          { v: "Full-Stack", l: t("about.stats.scope") },
          { v: "ULACIT", l: t("about.stats.education") },
        ].map((s) => (
          <div
            key={s.l}
            className="text-center p-2 rounded-lg bg-white/5 border border-white/5"
          >
            <p className="text-lg font-bold text-white">{s.v}</p>
            <p className="text-[10px] text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
