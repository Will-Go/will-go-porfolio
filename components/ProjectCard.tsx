"use client";
import Card from "./Card";
import Link from "next/link";
import TextDisplayer from "./TextDisplayer";
import { MotionProps } from "framer-motion";
import { formatDate } from "@/utils/dateFormatter";
import Project from "@/interfaces/IProject";
import { firstLetterCap } from "@/utils/firstLetterCap";
import { useTranslations, useLocale } from "next-intl";

//ICONS
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaCode,
  FaTags,
  FaStar,
} from "react-icons/fa";

export interface ProjectCardProps extends Project, MotionProps {
  index: number;
}

export default function ProjectCard({
  index,
  name,
  description,
  categories,
  technologies,
  repoUrl,
  url,
  created_at,
  ...motionProps
}: Readonly<ProjectCardProps>) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Card
      className="group hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 h-full flex flex-col"
      {...motionProps}
    >
      <div className="p-3 sm:p-4 lg:p-6 flex flex-col h-full">
        {/* Header Section */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-3 sm:mb-4 lg:mb-6">
          {/* Project Title with GitHub Link */}
          <div className="space-y-2 sm:space-y-3">
            {repoUrl ? (
              <Link
                href={repoUrl}
                target="_blank"
                className="group/link inline-flex items-center gap-2 sm:gap-3 hover:text-accent-300 transition-colors duration-300"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <FaGithub className="text-accent-500 text-sm sm:text-base lg:text-lg flex-shrink-0" />
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary-100 group-hover/link:underline group-hover/link:text-accent-300 transition-colors duration-300 line-clamp-2 break-words">
                    {name}
                  </h2>
                </div>
                <FaExternalLinkAlt className="text-xs sm:text-sm opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </Link>
            ) : url ? (
              <Link
                href={url}
                target="_blank"
                className="group/link inline-flex items-center gap-2 sm:gap-3 hover:text-accent-300 transition-colors duration-300"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary-100 group-hover/link:underline group-hover/link:text-accent-300 transition-colors duration-300 line-clamp-2 break-words">
                    {name}
                  </h2>
                </div>
                <FaExternalLinkAlt className="text-xs sm:text-sm opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </Link>
            ) : (
              <p className="group/link inline-flex items-center gap-2 sm:gap-3 hover:text-accent-300 transition-colors duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary-100 group-hover/link:underline group-hover/link:text-accent-300 transition-colors duration-300 line-clamp-2 break-words">
                    {name}
                  </h2>
                </div>
              </p>
            )}
            {/* Creation Date */}
            {created_at && (
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-400 text-xs sm:text-sm">
                <FaCalendarAlt className="text-accent-500 text-xs flex-shrink-0" />
                <span className="truncate">
                  {t("projects.projectCard.created")}{" "}
                  {formatDate(created_at, locale)}
                </span>
              </div>
            )}
          </div>
          {/* Description */}
          <div className="text-primary-400 leading-relaxed text-xs sm:text-sm flex-1">
            <TextDisplayer text={description} numClamp={3} />
          </div>
        </div>
        {/* Footer Section */}
        <div className="space-y-3 sm:space-y-4 mt-auto">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-200 text-xs sm:text-sm">
                <FaTags className="text-accent-500 flex-shrink-0" />
                <span className="font-medium truncate">
                  {categories.length === 1
                    ? t("projects.projectCard.category")
                    : t("projects.projectCard.categories")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((category, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-700/60 rounded-full text-blue-300 hover:border-blue-500/60 hover:text-blue-200 transition-all duration-300 cursor-default group/tag"
                  >
                    <span className="truncate">{firstLetterCap(category)}</span>
                  </span>
                ))}
              </div>
            </div>
          )}{" "}
          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-200 text-xs sm:text-sm">
                <FaCode className="text-accent-500 flex-shrink-0" />
                <span className="font-medium truncate">
                  {technologies.length === 1
                    ? t("projects.projectCard.technology")
                    : t("projects.projectCard.technologies")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {technologies.map((technology, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-gradient-to-r from-primary-900/80 to-primary-800/80 border border-primary-700/60 rounded-full text-primary-200 hover:border-accent-500/60 hover:text-accent-300 transition-all duration-300 cursor-default group/tech"
                  >
                    <span className="truncate">
                      {firstLetterCap(technology)}
                    </span>
                    <div className="ml-1 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      <FaStar className="text-xs" />
                    </div>
                  </span>
                ))}
              </div>
            </div>
          )}{" "}
          {/* Bottom Accent Line */}
          <div className="relative pt-3 sm:pt-4">
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
