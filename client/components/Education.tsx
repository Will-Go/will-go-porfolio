"use client";
import DescriptionReveal from "@/components/DescriptionReveal";
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
    <div className="flex h-full min-h-0 w-full max-w-none flex-col items-center justify-center gap-3 px-4 md:px-8 md:pt-10">
      <div className="relative z-10 flex w-full shrink-0 flex-col items-center gap-2 md:gap-3">
        <Reveal animationType="slideDown" duration={1} easing="backOut">
          <div className="max-w-4xl text-center">
            <div className="mb-2 flex items-center justify-center gap-2 md:mb-3 md:gap-3">
              <FaGraduationCap className="text-2xl text-accent-500 md:text-3xl" />
              <h1 className="bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 bg-clip-text text-2xl font-bold text-transparent md:text-4xl dark:from-primary-100 dark:via-accent-400 dark:to-primary-200">
                {t("title")}
              </h1>
            </div>
          </div>
        </Reveal>
        <DescriptionReveal className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-lg dark:text-primary-300">
          {t("subtitle")}
        </DescriptionReveal>
      </div>

      <Reveal
        animationType="fadeUp"
        delay={0.3}
        duration={0.8}
        easing="easeOut"
        className="w-full shrink-0"
      >
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white md:rounded-2xl dark:border-primary-700/40 dark:bg-primary-900/40">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-600" />

            <div className="pointer-events-none absolute -right-6 -top-6 hidden text-[140px] leading-none text-gray-100 select-none md:block md:text-[180px] dark:text-primary-800/20">
              <FaGraduationCap />
            </div>

            <div className="relative space-y-3.5 p-3.5 md:space-y-6 md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-500/20 bg-accent-500/10 sm:flex md:h-14 md:w-14 dark:bg-accent-500/20">
                  <FaGraduationCap className="text-xl text-accent-500 md:text-2xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-500 md:hidden">
                    {t("universityShort")}
                  </p>
                  <h2 className="mt-0.5 text-base font-bold leading-snug text-gray-900 md:mt-0 md:text-2xl dark:text-primary-100">
                    <span className="md:hidden">{t("degree")}</span>
                    <span className="hidden md:inline">{t("university")}</span>
                  </h2>
                  <p className="mt-1 hidden text-base font-semibold text-accent-500 md:block">
                    {t("degree")}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 md:hidden dark:text-primary-400">
                    {t("university")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2 sm:justify-end">
                  <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 md:gap-1.5 md:rounded-lg md:px-3 md:py-1.5 md:text-xs dark:bg-primary-800/60 dark:text-primary-300">
                    <FaCalendarAlt className="shrink-0 text-accent-500" />
                    {t("period")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 md:gap-1.5 md:rounded-lg md:px-3 md:py-1.5 md:text-xs dark:bg-primary-800/60 dark:text-primary-300">
                    <FaMapMarkerAlt className="shrink-0 text-accent-500" />
                    {t("location")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-green-500/20 bg-green-500/10 px-2 py-1 text-[11px] font-semibold text-green-600 md:gap-1.5 md:rounded-lg md:px-3 md:py-1.5 md:text-xs dark:bg-green-500/20 dark:text-green-400">
                    <FaCheckCircle className="shrink-0 text-[9px] md:text-[10px]" />
                    {t("progress")}
                  </span>
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-primary-700/50" />
                <div className="h-1.5 w-1.5 rounded-full bg-accent-500/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-accent-500/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-accent-500/10" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-transparent dark:via-primary-700/50" />
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500 md:mb-3 md:text-xs dark:text-primary-400">
                  {t("focusLabel")}
                </p>
                <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap md:gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-center text-[11px] font-medium leading-tight text-gray-700 sm:text-left sm:text-xs md:px-3 md:py-1.5 dark:border-primary-700/30 dark:bg-primary-800/50 dark:text-primary-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="-mx-3.5 -mb-3.5 mt-1 border-t border-accent-500/10 bg-accent-500/5 px-3.5 py-3 md:-mx-8 md:-mb-8 md:mt-4 md:px-8 md:py-4 dark:border-accent-500/20 dark:bg-accent-500/10">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent-600 md:mb-0 md:hidden dark:text-accent-400">
                  {t("capabilitiesLabel")}
                </p>
                <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-6">
                  <span className="hidden text-xs font-semibold uppercase tracking-wider text-accent-600 md:inline dark:text-accent-400">
                    {t("capabilitiesLabel")}
                  </span>
                  {capabilities.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-700 md:gap-2 md:text-sm dark:text-primary-300"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent-500" />
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
