"use client";

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
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-2">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUser className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </Reveal>

      {/* Two-column: Intro + Stats */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Bio Card */}
        <Reveal
          animationType="fadeRight"
          delay={0.2}
          duration={0.8}
          easing="easeOut"
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <div className="p-4 md:p-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-800 dark:text-primary-200">
                <FaMapMarkerAlt className="text-accent-500" />
                <span className="text-sm font-medium text-gray-500 dark:text-primary-400">
                  Costa Rica
                </span>
              </div>

              <p className="text-gray-700 dark:text-primary-300 leading-relaxed text-base">
                {t("intro")}
              </p>

              {/* Core Tech Stack */}
              <div className="pt-4 border-t border-gray-200 dark:border-primary-800/30">
                <p className="text-xs font-semibold text-gray-500 dark:text-primary-400 uppercase tracking-wider mb-3">
                  {t("coreStack")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CORE_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-accent-500/10 to-accent-500/5 border border-accent-500/20 rounded-full text-accent-600 dark:text-accent-400 dark:from-accent-500/20 dark:to-accent-500/10 dark:border-accent-500/30 transition-all duration-300 hover:border-accent-500/50 hover:bg-accent-500/20 cursor-default"
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
          <div className="grid grid-cols-2 gap-3 h-full">
            {stats.map((stat, index) => (
              <Reveal
                key={index}
                animationType="scale"
                delay={0.5 + index * 0.1}
                duration={0.5}
                easing="backOut"
              >
                <div className="h-full flex flex-col items-center justify-center text-center p-4 rounded-lg bg-gray-50 dark:bg-primary-900/30 border border-gray-200 dark:border-primary-800/40 hover:border-accent-500/50 transition-all duration-300 group cursor-default">
                  <div className="text-lg mb-1.5 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-primary-100">
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
