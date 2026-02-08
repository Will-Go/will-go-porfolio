"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Dialog from "@/components/Dialog";
import SearchInput from "@/components/inputs/SearchInput";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SkillChip from "@/components/SkillChip";

import { TechSkill } from "@/lib/api/skills";

interface SkillsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  skills: TechSkill[];
}

const SkillsDialog = ({ isOpen, setIsOpen, skills }: SkillsDialogProps) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

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
        <SearchInput
          placeholder={t("skills.searchPlaceholder")}
          value={searchQuery}
          onChange={setSearchQuery}
        />

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
      </div>
    </Dialog>
  );
};

export default SkillsDialog;
