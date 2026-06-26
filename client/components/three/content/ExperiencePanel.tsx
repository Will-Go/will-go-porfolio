"use client";

import { useTranslations } from "next-intl";
import { FaBriefcase } from "react-icons/fa";
import ExperienceTimeline from "@/components/ExperienceTimeline";

interface IExperiencePanelProps {
  scrollContainer?: HTMLElement | null;
}

export function ExperiencePanel({ scrollContainer }: IExperiencePanelProps) {
  const tExperience = useTranslations("experience");

  if (!scrollContainer) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 py-4">
      <div className="w-full max-w-4xl space-y-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <FaBriefcase className="text-3xl text-accent-500" />
          <h1 className="bg-linear-to-r from-gray-800 via-accent-500 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-primary-100 dark:via-accent-400 dark:to-primary-200">
            {tExperience("title")}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-primary-300">
          {tExperience("subtitle")}
        </p>
      </div>

      <ExperienceTimeline scrollContainer={scrollContainer} />
    </div>
  );
}
