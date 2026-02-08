"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { TechSkill } from "@/lib/api/skills";
import { useTranslations } from "next-intl";
import { dateToCountYears } from "@/utils/dateFormatter";

const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={i}
            className="text-accent-600 dark:text-accent-400 font-bold bg-accent-500/10 rounded-sm"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

interface SkillChipProps {
  skill: TechSkill;
  searchQuery?: string;
  index?: number;
  animate?: boolean;
}

const SkillChip = ({
  skill,
  searchQuery = "",
  index = 0,
  animate = true,
}: SkillChipProps) => {
  const t = useTranslations();
  const duration = dateToCountYears(skill.started_at);

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 30, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }
    : {};

  return (
    <motion.div
      {...animationProps}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group w-full max-w-[140px]"
    >
      <div className="relative flex flex-col rounded-2xl items-center justify-center text-center border-2 border-gray-200 dark:border-primary-800/60 cursor-default p-4 bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 dark:from-primary-950/80 dark:via-primary-900/60 dark:to-primary-950/80 hover:border-accent-500/60 hover:bg-gradient-to-br hover:from-accent-500/10 hover:via-white/60 hover:to-accent-500/10 dark:hover:from-accent-900/20 dark:hover:via-primary-900/60 dark:hover:to-accent-950/20 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-accent-500/20">
        {/* Skill Name */}
        <span className="text-xs font-medium text-gray-700 dark:text-primary-200 group-hover:text-accent-500 dark:group-hover:text-accent-300 transition-colors duration-300 text-center leading-tight mb-1">
          <HighlightText text={skill.name} highlight={searchQuery} />
        </span>

        {/* Experience Duration */}
        <span className="text-[10px] text-gray-500 dark:text-primary-400 group-hover:text-accent-600 dark:group-hover:text-accent-200 font-light">
          {t(`common.dateUtils.${duration.type}`, {
            count: duration.count,
            plural: duration.count === 1 ? "" : "s",
          })}
        </span>

        {/* Floating Stars Effect on Hover */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <FaStar className="text-accent-400 text-xs animate-pulse" />
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-3/4 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

export default SkillChip;
