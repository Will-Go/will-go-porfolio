"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import BackgroundBlur from "@/components/BackgroundBlur";
import DescriptionReveal from "@/components/DescriptionReveal";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getSkills, TechSkill } from "@/lib/api/skills";
import { useTranslations } from "next-intl";
import SkillsDialog from "@/components/SkillsDialog";

//ICONS
import { FaCode } from "react-icons/fa";
import SearchInput from "@/components/inputs/SearchInput";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SkillChip from "@/components/SkillChip";
import { Select } from "@/components/inputs/Select";
import SkillChipSkeleton from "@/components/skeletons/SkillChipSkeleton";

function getDisplayLimit(width: number) {
  if (width >= 1280) return 18;
  if (width >= 1024) return 15;
  return 12;
}

function Skills() {
  const t = useTranslations();
  const controls = useAnimation();
  const refSkills = useRef<HTMLHeadingElement | null>(null);
  const isInViewSkills = useInView(refSkills, { once: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [displayLimit, setDisplayLimit] = useState(12);

  useEffect(() => {
    const updateLimit = () =>
      setDisplayLimit(getDisplayLimit(window.innerWidth));
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const { data: skills = [], isLoading } = useQuery<TechSkill[]>({
    queryKey: ["skills", sortOrder, isInViewSkills],
    queryFn: () => {
      if (!isInViewSkills) return [];
      let orderBy: { column: string; ascending: boolean } | undefined;
      if (sortOrder === "newest") {
        orderBy = { column: "started_at", ascending: false };
      } else if (sortOrder === "oldest") {
        orderBy = { column: "started_at", ascending: true };
      }
      return getSkills(orderBy);
    },
  });

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedSkills = filteredSkills.slice(0, displayLimit);

  useEffect(() => {
    if (isInViewSkills) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [isInViewSkills, controls]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 px-4 py-2">
      <BackgroundBlur className="h-96 w-96 opacity-30" />

      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="max-w-4xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <FaCode className="text-3xl text-accent-500" />
            <h1
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent"
              ref={refSkills}
            >
              {t("skills.title")}
            </h1>
          </div>
        </div>
      </Reveal>
      <DescriptionReveal className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-primary-300">
        {t("skills.subtitle")}
      </DescriptionReveal>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-50 mx-auto mb-2 flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center"
      >
        <SearchInput
          placeholder={t("skills.searchPlaceholder")}
          value={searchQuery}
          onChange={setSearchQuery}
          containerClassName="!mx-0 !w-full sm:flex-1"
        />

        <div className="flex items-center justify-end gap-2 px-1 sm:shrink-0">
          <label className="text-sm font-medium text-gray-600 dark:text-primary-300">
            {t("skills.sortOrder")}
          </label>
          <div className="w-[140px]">
            <Select
              value={sortOrder}
              onChange={setSortOrder}
              options={[
                { value: "default", label: t("skills.sortOptions.default") },
                { value: "newest", label: t("skills.sortOptions.newest") },
                { value: "oldest", label: t("skills.sortOptions.oldest") },
              ]}
            />
          </div>
        </div>
      </motion.div>

      <Reveal
        animationType="fadeIn"
        delay={0.3}
        duration={1}
        easing="easeOut"
        className="!z-50 "
      >
        <div className="w-full max-w-6xl min-h-[200px]">
          {!isLoading && isInViewSkills && (
            <>
              {displayedSkills.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 justify-items-center gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {displayedSkills.map((techSkill, i) => (
                      <SkillChip
                        key={i}
                        skill={techSkill}
                        searchQuery={searchQuery}
                        index={i}
                      />
                    ))}
                  </div>

                  {filteredSkills.length > displayLimit && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setIsDialogOpen(true)}
                        className="px-6 py-2 rounded-full border border-accent-500/30 bg-accent-500/10 hover:bg-accent-500/20 text-accent-600 dark:text-accent-400 font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        {t("skills.seeMore")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 dark:text-primary-300">
                  <HiOutlineEmojiSad className="text-5xl mb-4 text-gray-400 dark:text-primary-400" />
                  <p className="text-lg font-medium">{t("skills.noSkills")}</p>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="grid grid-cols-2 justify-items-center gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkillChipSkeleton key={i} index={i} />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <SkillsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />

      {/* Skills Count */}
      <Reveal animationType="scale" delay={0.6} duration={0.8} easing="backOut">
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-accent-500/70 dark:bg-accent-500/20 rounded-full border border-accent-500/30 text-black! dark:text-blue-200!">
            {t("skills.technologies", { count: skills.length })}
          </span>
        </div>
      </Reveal>
    </div>
  );
}

export default Skills;
