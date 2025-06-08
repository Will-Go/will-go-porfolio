"use client";
import Card from "./Card";
import Link from "next/link";
import TextDisplayer from "./TextDisplayer";
import { MotionProps } from "framer-motion";
import { formatDate } from "@/utils/dateFormatter";
import Project from "@/interfaces/IProject";
import { firstLetterCap } from "@/utils/firstLetterCap";

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
  created_at,
  ...motionProps
}: Readonly<ProjectCardProps>) {
  return (
    <Card
      className="group hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 h-full flex flex-col"
      {...motionProps}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header Section */}
        <div className="space-y-4 mb-6">
          {/* Project Title with GitHub Link */}
          <div className="space-y-3">
            <Link
              href={repoUrl}
              target="_blank"
              className="group/link inline-flex items-center gap-3 hover:text-accent-300 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 flex-1">
                <FaGithub className="text-accent-500 text-lg flex-shrink-0" />
                <h2 className="text-xl font-bold text-primary-100 group-hover/link:underline group-hover/link:text-accent-300 transition-colors duration-300 line-clamp-2">
                  {name}
                </h2>
              </div>
              <FaExternalLinkAlt className="text-sm opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300" />
            </Link>

            {/* Creation Date */}
            {created_at && (
              <div className="flex items-center gap-2 text-primary-400 text-sm">
                <FaCalendarAlt className="text-accent-500 text-xs" />
                <span>Created {formatDate(created_at)}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-primary-400 leading-relaxed text-sm flex-1">
            <TextDisplayer text={description} numClamp={4} />
          </div>
        </div>

        {/* Footer Section */}
        <div className="space-y-4 mt-auto">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <FaTags className="text-accent-500" />
                <span className="font-medium">
                  Categor{categories.length === 1 ? "y" : "ies"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-700/60 rounded-full text-blue-300 hover:border-blue-500/60 hover:text-blue-200 transition-all duration-300 cursor-default group/tag"
                  >
                    {firstLetterCap(category)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <FaCode className="text-accent-500" />
                <span className="font-medium">
                  Technolog{technologies.length === 1 ? "y" : "ies"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-primary-900/80 to-primary-800/80 border border-primary-700/60 rounded-full text-primary-200 hover:border-accent-500/60 hover:text-accent-300 transition-all duration-300 cursor-default group/tech"
                  >
                    {firstLetterCap(technology)}
                    <div className="ml-1 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300">
                      <FaStar className="text-xs" />
                    </div>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Accent Line */}
          <div className="relative pt-4">
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
