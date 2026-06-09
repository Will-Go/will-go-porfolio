"use client";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Education() {
  const t = useTranslations("education");

  const focusAreas: string[] = t.raw("focus");
  const capabilities: string[] = t.raw("capabilities");

  return (
    <div
      id="education"
      className="flex flex-col items-center justify-center my-16 gap-8 px-4"
    >
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGraduationCap className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>
        </div>
      </Reveal>

      <Reveal
        animationType="fadeUp"
        delay={0.3}
        duration={0.8}
        easing="easeOut"
      >
        <div className="w-full max-w-4xl">
          {/* Main diploma-style panel */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-primary-700/40 bg-white dark:bg-primary-900/40">
            {/* Left accent strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-600" />

            {/* Background watermark */}
            <div className="absolute -right-8 -top-8 text-[180px] text-gray-100 dark:text-primary-800/20 select-none pointer-events-none leading-none">
              <FaGraduationCap />
            </div>

            <div className="relative p-6 md:p-8 space-y-6">
              {/* Header with large icon */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded-xl bg-accent-500/10 dark:bg-accent-500/20 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
                  <FaGraduationCap className="text-accent-500 text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-primary-100 leading-tight">
                    {t("university")}
                  </h2>
                  <p className="text-base text-accent-500 font-semibold mt-1">
                    {t("degree")}
                  </p>
                </div>

                {/* Metadata chips */}
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-primary-800/60 text-xs font-medium text-gray-600 dark:text-primary-300">
                    <FaCalendarAlt className="text-accent-500" />
                    {t("period")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-primary-800/60 text-xs font-medium text-gray-600 dark:text-primary-300">
                    <FaMapMarkerAlt className="text-accent-500" />
                    {t("location")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-xs font-semibold text-green-600 dark:text-green-400">
                    <FaCheckCircle className="text-[10px]" />
                    {t("progress")}
                  </span>
                </div>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-primary-700/50 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500/10" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 dark:via-primary-700/50 to-transparent" />
              </div>

              {/* Coursework */}
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-primary-400 uppercase tracking-wider mb-3">
                  {t("focusLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-primary-800/50 border border-gray-200 dark:border-primary-700/30 rounded-full text-gray-700 dark:text-primary-300 transition-all duration-300 hover:border-accent-500/40 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-accent-500/5 cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities strip */}
              <div className="-mx-6 md:-mx-8 -mb-6 md:-mb-8 mt-4 px-6 md:px-8 py-4 bg-accent-500/5 dark:bg-accent-500/10 border-t border-accent-500/10 dark:border-accent-500/20">
                <div className="flex flex-wrap items-center gap-3 md:gap-6">
                  <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                    {t("capabilitiesLabel")}
                  </span>
                  {capabilities.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-medium text-gray-700 dark:text-primary-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Education;
