"use client";

import { useTranslations } from "next-intl";

export function SkillsPanel() {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        <h2 className="text-xl font-bold text-white">
          {t("skills.title")}
        </h2>
      </div>
      <p className="text-xs text-gray-400">{t("skills.subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            n: "Frontend",
            s: [
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ],
          },
          {
            n: "Backend",
            s: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "MSSQL"],
          },
          {
            n: "Tools",
            s: ["Git", "Docker", "VS Code", "Figma", "Vercel"],
          },
          {
            n: "Languages",
            s: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"],
          },
        ].map((c) => (
          <div key={c.n} className="space-y-1.5">
            <p className="text-xs font-semibold text-accent-500 uppercase tracking-wider">
              {c.n}
            </p>
            <div className="flex flex-wrap gap-1">
              {c.s.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] bg-white/5 border border-accent-500/15 rounded-full text-gray-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
