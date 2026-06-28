"use client";
import { useEffect, useState } from "react";
import DescriptionReveal from "@/components/DescriptionReveal";
import Reveal from "@/components/Reveal";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { useTranslations } from "next-intl";

//ICONS
import { FaGithub, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

//INTERFACE
import Project, { IncomingProject } from "@/interfaces/IProject";

//LOCAL DATA
import localProjects from "@/content/projects";

export default function WrappedProjects() {
  return <Projects />;
}

function Projects() {
  const t = useTranslations();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFetchError, setProjectFetchError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          "https://api.github.com/search/repositories?q=user%3AWill-Go%20topic%3Aporfolio&sort=updated&direction=desc",
        );

        if (!res.ok) {
          setProjects(localProjects);
          setProjectFetchError(t("projects.error"));
        } else {
          const data = await res.json();

          const fetchedProjects = data.items.map((item: IncomingProject) => {
            let tech: string[] = [];
            let cat: string[] = [];

            item.topics.forEach((topic: string) => {
              if (topic.startsWith("c-")) {
                cat.push(topic.replace("c-", ""));
              } else if (topic.startsWith("t-")) {
                tech.push(topic.replace("t-", ""));
              }
            });

            return {
              name: item.name,
              description: item.description,
              categories: cat,
              technologies: tech,
              repoUrl: item.html_url,
              created_at: item.created_at,
            };
          });

          const allProjects = [...localProjects, ...fetchedProjects].sort(
            (a, b) =>
              new Date(b.created_at ?? 0).getTime() -
              new Date(a.created_at ?? 0).getTime(),
          );

          setProjects(allProjects);
        }
      } catch {
        setProjects(localProjects);
        setProjectFetchError(t("projects.error"));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [t]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <FaSpinner className="text-2xl text-accent-500 animate-spin" />
          <span className="text-primary-300">{t("projects.loading")}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full max-w-none flex-col items-center px-4 md:px-8 md:pt-10">
      <div className="relative z-10 flex w-full shrink-0 flex-col items-center gap-3">
        <Reveal animationType="slideDown" duration={1} easing="backOut">
          <div className="max-w-4xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <FaGithub className="text-3xl text-accent-500" />
              <h1 className="bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-primary-100 dark:via-accent-400 dark:to-primary-200">
                {t("projects.title")}
              </h1>
            </div>
          </div>
        </Reveal>
        <DescriptionReveal className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-primary-300 md:text-lg">
          {t("projects.subtitle")}
        </DescriptionReveal>
        {projects.length > 0 && (
          <Reveal
            animationType="fadeUp"
            delay={0.8}
            duration={0.8}
            easing="easeOut"
          >
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
          </Reveal>
        )}
      </div>

      <Reveal
        animationType="fadeUp"
        delay={0.3}
        duration={1}
        easing="easeOut"
        className="mt-8 w-full md:mt-10"
      >
        {projects.length === 0 && !projectFetchError && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-primary-400 text-lg">
              {t("projects.noProjects")}
            </p>
            <p className="text-gray-400 dark:text-primary-500 text-sm mt-2">
              {t("projects.noProjectsSubtitle")}
            </p>
          </div>
        )}
        {projectFetchError && (
          <div className="flex items-center justify-center gap-3 py-12">
            <FaExclamationTriangle className="text-red-400 text-xl" />
            <div className="text-center">
              <p className="text-red-400 font-semibold">
                {t("projects.error")}
              </p>
              <p className="text-red-300 text-sm mt-1">{projectFetchError}</p>
            </div>
          </div>
        )}
        {projects.length > 0 && <ProjectsCarousel projects={projects} />}
      </Reveal>
    </div>
  );
}
