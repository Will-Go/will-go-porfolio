"use client";

import DescriptionReveal from "@/components/DescriptionReveal";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import { useTranslations } from "next-intl";

//ICONS
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaRocket,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const CORE_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
];

function About() {
  const t = useTranslations("about");

  const stats = [
    {
      value: "3+",
      label: t("stats.years"),
      icon: <FaCalendarAlt className="text-accent-500" />,
    },
    {
      value: "15+",
      label: t("stats.projects"),
      icon: <FaRocket className="text-green-500" />,
    },
    {
      value: "Full-Stack",
      label: t("stats.scope"),
      icon: <FaCode className="text-blue-500" />,
    },
    {
      value: "ULACIT",
      label: t("stats.education"),
      icon: <FaGraduationCap className="text-purple-500" />,
    },
  ];

  return (
    <div className="flex w-full max-w-none flex-col items-center gap-3 px-4 md:px-8 md:pt-10">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="max-w-4xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <FaUser className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>
        </div>
      </Reveal>
      <DescriptionReveal className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-primary-300">
        {t("subtitle")}
      </DescriptionReveal>

      {/* Two-column: Intro + Stats */}
      <div className="w-full max-w-4xl grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-5">
        {/* Left: Bio Card */}
        <Reveal
          animationType="fadeRight"
          delay={0.2}
          duration={0.8}
          easing="easeOut"
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <div className="space-y-3 p-3 md:space-y-4 md:p-6">
              <div className="flex items-center gap-2 text-gray-800 dark:text-primary-200">
                <FaMapMarkerAlt className="text-accent-500" />
                <span className="text-sm font-medium text-gray-500 dark:text-primary-400">
                  Costa Rica
                </span>
              </div>

              <DescriptionReveal className="text-base leading-relaxed text-gray-700 dark:text-primary-300">
                {t("intro")}
              </DescriptionReveal>

              {/* Core Tech Stack */}
              <div className="pt-4 border-t border-gray-200 dark:border-primary-800/30">
                <p className="text-xs font-semibold text-gray-500 dark:text-primary-400 uppercase tracking-wider mb-3">
                  {t("coreStack")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CORE_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-accent-500/20 bg-gradient-to-r from-accent-500/10 to-accent-500/5 px-2.5 py-1 text-xs font-medium text-accent-600 transition-all duration-300 hover:border-accent-500/50 hover:bg-accent-500/20 dark:border-accent-500/30 dark:from-accent-500/20 dark:to-accent-500/10 dark:text-accent-400 md:px-3 md:py-1.5 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Right: Stats Stack */}
        <Reveal
          animationType="fadeLeft"
          delay={0.4}
          duration={0.8}
          easing="easeOut"
          className="lg:col-span-2"
        >
          <div className="grid h-full grid-cols-2 gap-2 md:gap-3">
            {stats.map((stat, index) => (
              <Reveal
                key={index}
                animationType="scale"
                delay={0.5 + index * 0.1}
                duration={0.5}
                easing="backOut"
              >
                <div className="group flex h-full cursor-default flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3 text-center transition-all duration-300 hover:border-accent-500/50 dark:border-primary-800/40 dark:bg-primary-900/30 md:p-4">
                  <div className="text-lg mb-1.5 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-lg font-bold text-gray-900 md:text-2xl dark:text-primary-100">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-primary-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default About;
