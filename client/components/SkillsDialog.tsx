"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Dialog from "@/components/Dialog";
import SearchInput from "@/components/inputs/SearchInput";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SkillChip from "@/components/SkillChip";

import { Select } from "@/components/inputs/Select";
import SkillChipSkeleton from "@/components/skeletons/SkillChipSkeleton";
import { getSkills, TechSkill } from "@/lib/api/skills";
import { useQuery } from "@tanstack/react-query";

interface SkillsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SkillsDialog = ({ isOpen, setIsOpen }: SkillsDialogProps) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
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
    enabled: isOpen,
  });

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={t("skills.title")}
      description={t("skills.subtitle")}
      size="4xl"
      contentClassName="max-h-[90vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-8 py-4">
        <div className="flex flex-col gap-3">
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

        {!isLoading && (
          <>
            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
                {filteredSkills.map((techSkill, i) => (
                  <SkillChip
                    key={i}
                    skill={techSkill}
                    searchQuery={searchQuery}
                    animate={false} // Dialog doesn't need entrance animation
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-gray-500 dark:text-primary-300">
                <HiOutlineEmojiSad className="text-5xl mb-4 text-gray-400 dark:text-primary-400" />
                <p className="text-lg font-medium">{t("skills.noSkills")}</p>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkillChipSkeleton key={i} index={i} />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default SkillsDialog;
