"use client";

import { useTranslations } from "next-intl";

export function PanelContent({ zone }: { zone: string }) {
  const t = useTranslations();
  const CORE = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Supabase",
  ];

  switch (zone) {
    case "welcome":
      return (
        <div className="text-left space-y-2">
          <p className="text-sm text-gray-100 leading-relaxed">
            <span className="text-accent-400">{t("home.welcome")}!</span>{" "}
            {t("home.name")}. {t("home.title")} based in{" "}
            {t("home.location")}.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {t("home.description", { location: t("home.location") })}
          </p>
        </div>
      );
    case "about":
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
    case "skills":
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
    case "education":
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            <h2 className="text-xl font-bold text-white">
              {t("education.title")}
            </h2>
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
    case "experience":
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
    default:
      return null;
  }
}
