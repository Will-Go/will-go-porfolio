"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FaExclamationTriangle, FaGithub, FaSpinner } from "react-icons/fa";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { getProjects } from "@/lib/api/projects";

export function ProjectsPanel() {
  const t = useTranslations();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects = data?.projects ?? [];
  const projectFetchError = data?.hasFetchError ? t("projects.error") : "";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 py-16">
        <div className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-2xl text-accent-500" />
          <span className="text-primary-300">{t("projects.loading")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-none flex-col items-center justify-center gap-2 py-4 md:px-4">
      <div className="w-full max-w-4xl space-y-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <FaGithub className="text-3xl text-accent-500" />
          <h1 className="bg-linear-to-r from-gray-800 via-accent-500 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-primary-100 dark:via-accent-400 dark:to-primary-200">
            {t("projects.title")}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-primary-300">
          {t("projects.subtitle")}
        </p>
      </div>

      {projects.length > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-2 dark:bg-accent-500/20">
            <FaGithub className="text-accent-400" />
            <span className="text-sm text-gray-600 dark:text-primary-300">
              {t("projects.count", {
                count: projects.length,
                plural: projects.length !== 1 ? "s" : "",
              })}
            </span>
          </div>
        </div>
      )}

      {projects.length === 0 && !projectFetchError && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500 dark:text-primary-400">
            {t("projects.noProjects")}
          </p>
          <p className="mt-2 text-sm text-gray-400 dark:text-primary-500">
            {t("projects.noProjectsSubtitle")}
          </p>
        </div>
      )}

      {projectFetchError && (
        <div className="flex items-center justify-center gap-3 py-12">
          <FaExclamationTriangle className="text-xl text-red-400" />
          <div className="text-center">
            <p className="font-semibold text-red-400">{t("projects.error")}</p>
            <p className="mt-1 text-sm text-red-300">{projectFetchError}</p>
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="w-full mt-6">
          <ProjectsCarousel projects={projects} />
        </div>
      )}
    </div>
  );
}
