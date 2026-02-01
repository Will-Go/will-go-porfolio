"use client";
import Card from "./Card";
import Image from "next/image";
import Link from "next/link";
import { MotionProps } from "framer-motion";
import TextDisplayer from "./TextDisplayer";
import { useTranslations } from "next-intl";

//ICONS
import { FaExternalLinkAlt, FaCalendarAlt, FaTools } from "react-icons/fa";

import Experience from "@/interfaces/IExperience";
export interface ExperienceCardProps extends Experience, MotionProps {
  index: number;
  isLeft?: boolean;
}

export default function ExperienceCard({
  index,
  name,
  date,
  description,
  technologies,
  imageUrl,
  companyUrl,
  isLeft = true,
  ...motionProps
}: Readonly<ExperienceCardProps>) {
  const t = useTranslations("common");

  return (
    <Card
      className="group hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 w-full"
      {...motionProps}
    >
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-primary-100 group-hover:text-accent-300 transition-colors duration-300">
              {name}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 dark:text-primary-400">
              <FaCalendarAlt className="text-accent-500 text-sm" />
              <span className="text-sm font-medium capitalize">{date}</span>
            </div>
          </div>

          {/* Company Image */}
          <div className="flex-shrink-0">
            {companyUrl ? (
              <Link
                href={companyUrl}
                target="_blank"
                className="relative group/company block"
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-primary-600/30">
                  <Image
                    alt={`${name} company logo`}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover transition-all duration-300 group-hover/company:scale-110"
                    src={imageUrl}
                    width={96}
                    height={96}
                  />
                  <div className="absolute inset-0  group-hover/company:bg-accent-500/20 transition-all duration-300 flex items-center justify-center">
                    <FaExternalLinkAlt className="text-white text-sm" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-xl overflow-hidden">
                <Image
                  alt={`${name} company logo`}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover"
                  src={imageUrl}
                  width={96}
                  height={96}
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="text-gray-600 dark:text-primary-400 leading-relaxed">
            <TextDisplayer text={description} />
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-800 dark:text-primary-200">
            <FaTools className="text-accent-500" />
            <h3 className="font-semibold">{t("technologiesUsed")}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-primary-900/80 dark:to-primary-800/80 border border-gray-200 dark:border-primary-700/60 rounded-full text-gray-700 dark:text-primary-200 hover:border-accent-500/60 hover:text-accent-300 transition-all duration-300 cursor-default"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Company Link */}
        {companyUrl && (
          <div className="pt-4 border-t border-gray-200 dark:border-primary-800/30">
            <Link
              href={companyUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors duration-300 group/link"
            >
              <span>{t("visitCompany")} Website</span>
              <FaExternalLinkAlt className="text-xs group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
