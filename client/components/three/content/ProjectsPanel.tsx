"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FaExclamationTriangle, FaGithub, FaSpinner } from "react-icons/fa";
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
      <div className="flex items-center justify-center gap-2 py-8">
        <FaSpinner className="text-accent-500 animate-spin" />
        <span className="text-xs text-gray-400">{t("projects.loading")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500" />
        <h2 className="text-xl font-bold text-white">{t("projects.title")}</h2>
      </div>
      <p className="text-xs text-gray-400">{t("projects.subtitle")}</p>

      {projects.length > 0 && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-500/10 rounded-full border border-accent-500/20">
          <FaGithub className="text-accent-400 text-xs" />
          <span className="text-[10px] text-gray-300">
            {t("projects.count", {
              count: projects.length,
              plural: projects.length !== 1 ? "s" : "",
            })}
          </span>
        </div>
      )}

      {projects.length === 0 && !projectFetchError && (
        <p className="text-xs text-gray-400 py-4 text-center">
          {t("projects.noProjects")}
        </p>
      )}

      {projectFetchError && (
        <div className="flex items-center gap-2 py-4">
          <FaExclamationTriangle className="text-red-400 shrink-0" />
          <p className="text-xs text-red-400">{projectFetchError}</p>
        </div>
      )}

      <div className="space-y-3 max-h-[50vh] overflow-y-auto overscroll-contain px-3">
        {projects.map((project) => (
          <div
            key={project.repoUrl ?? project.name}
            className="p-3 rounded-xl bg-white/5 border border-white/5"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              {project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-accent-400 transition-colors line-clamp-2"
                >
                  {project.name}
                </Link>
              ) : (
                <p className="text-sm font-semibold text-white line-clamp-2">
                  {project.name}
                </p>
              )}
              {project.repoUrl && (
                <FaGithub className="text-accent-500 shrink-0 mt-0.5" />
              )}
            </div>
            {project.description && (
              <p className="text-xs text-gray-400 line-clamp-3">
                {project.description}
              </p>
            )}
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[10px] bg-accent-500/5 border border-accent-500/15 rounded text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
