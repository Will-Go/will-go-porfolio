"use client";

import { useTranslations } from "next-intl";

export function ExperiencePanel() {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        <h2 className="text-xl font-bold text-white">
          {t("experience.title")}
        </h2>
      </div>
      <p className="text-xs text-gray-400">{t("experience.subtitle")}</p>
      {[
        {
          key: "newstreet",
          techs: [
            "Next.js",
            "React.js",
            "TypeScript",
            "TailwindCSS",
            "Supabase",
          ],
        },
        {
          key: "dwoof",
          techs: [
            "Next.js",
            "React.js",
            "Supabase",
            "TailwindCSS",
            "PostgreSQL",
          ],
        },
      ].map((exp) => (
        <div
          key={exp.key}
          className="p-3 rounded-xl bg-white/5 border border-white/5"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-white">
              {t(`experience.experiences.${exp.key}.name`)}
            </p>
            <span className="text-[10px] text-accent-500">
              {t(`experience.experiences.${exp.key}.date`)}
            </span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-3">
            {t(`experience.experiences.${exp.key}.description`)}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {exp.techs.map((t2) => (
              <span
                key={t2}
                className="px-1.5 py-0.5 text-[10px] bg-accent-500/5 border border-accent-500/15 rounded text-gray-300"
              >
                {t2}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
