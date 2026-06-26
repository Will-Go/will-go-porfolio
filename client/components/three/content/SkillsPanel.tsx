"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FaCode } from "react-icons/fa";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SearchInput from "@/components/inputs/SearchInput";
import { Select } from "@/components/inputs/Select";
import SkillChip from "@/components/SkillChip";
import SkillChipSkeleton from "@/components/skeletons/SkillChipSkeleton";
import SkillsDialog from "@/components/SkillsDialog";
import { getSkills, TechSkill } from "@/lib/api/skills";

const DISPLAY_LIMIT = 18;

export function SkillsPanel() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  const { data: skills = [], isLoading } = useQuery<TechSkill[]>({
    queryKey: ["skills", sortOrder],
    queryFn: () => {
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

  const displayedSkills = filteredSkills.slice(0, DISPLAY_LIMIT);

  return (
    <div className="flex w-full flex-col items-center gap-8 py-4">
      <div className="w-full max-w-4xl space-y-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <FaCode className="text-3xl text-accent-500" />
          <h1 className="bg-linear-to-r from-gray-800 via-accent-500 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-primary-100 dark:via-accent-400 dark:to-primary-200">
            {t("skills.title")}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-primary-300">
          {t("skills.subtitle")}
        </p>
      </div>

      <div className="relative z-50 mx-auto flex w-full max-w-md flex-col gap-3">
        <SearchInput
          placeholder={t("skills.searchPlaceholder")}
          value={searchQuery}
          onChange={setSearchQuery}
          containerClassName="!mx-0 !w-full"
        />

        <div className="flex items-center justify-end gap-3 px-1">
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
      </div>

      <div className="min-h-[300px] w-full max-w-6xl">
        {!isLoading && (
          <>
            {displayedSkills.length > 0 ? (
              <>
                <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {displayedSkills.map((techSkill, i) => (
                    <SkillChip
                      key={i}
                      skill={techSkill}
                      searchQuery={searchQuery}
                      index={i}
                    />
                  ))}
                </div>

                {filteredSkills.length > DISPLAY_LIMIT && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="cursor-pointer rounded-full border border-accent-500/30 bg-accent-500/10 px-6 py-2 font-medium text-accent-600 transition-all duration-300 hover:scale-105 hover:bg-accent-500/20 dark:text-accent-400"
                    >
                      {t("skills.seeMore")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center text-gray-500 dark:text-primary-300">
                <HiOutlineEmojiSad className="mb-4 text-5xl text-gray-400 dark:text-primary-400" />
                <p className="text-lg font-medium">{t("skills.noSkills")}</p>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkillChipSkeleton key={i} index={i} />
            ))}
          </div>
        )}
      </div>

      <SkillsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />

      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-full border border-accent-500/30 bg-accent-500/70 px-3 py-1 text-black! dark:bg-accent-500/20 dark:text-blue-200!">
          {t("skills.technologies", { count: skills.length })}
        </span>
      </div>
    </div>
  );
}
