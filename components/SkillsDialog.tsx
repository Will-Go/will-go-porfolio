"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Dialog from "@/components/Dialog";
import { FaStar } from "react-icons/fa";
import SearchInput from "@/components/inputs/SearchInput";
import { HiOutlineEmojiSad } from "react-icons/hi";

interface SkillsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  skills: string[];
}

const SkillsDialog = ({ isOpen, setIsOpen, skills }: SkillsDialogProps) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase()),
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
              <div key={i} className="group w-full max-w-[140px]">
                <div className="relative flex flex-col rounded-2xl items-center justify-center text-center border-2 border-gray-200 dark:border-primary-800/60 cursor-default p-4 bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 dark:from-primary-950/80 dark:via-primary-900/60 dark:to-primary-950/80 hover:border-accent-500/60 hover:bg-gradient-to-br hover:from-accent-500/10 hover:via-white/60 hover:to-accent-500/10 dark:hover:from-accent-900/20 dark:hover:via-primary-900/60 dark:hover:to-accent-950/20 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-accent-500/20">
                  <span className="text-xs font-medium text-gray-700 dark:text-primary-200 group-hover:text-accent-500 dark:group-hover:text-accent-300 transition-colors duration-300 text-center leading-tight">
                    {techSkill}
                  </span>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <FaStar className="text-accent-400 text-xs animate-pulse" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-3/4 transition-all duration-300"></div>
                </div>
              </div>
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
