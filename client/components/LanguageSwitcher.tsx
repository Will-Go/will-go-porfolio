"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/services";
import { cn } from "@/utils/cn";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onSelectChange = (value: string) => {
    const nextLocale = value as Locale;
    startTransition(() => {
      setUserLocale(nextLocale);
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLanguage = languages.find((l) => l.value === locale);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300",
          "text-sm font-medium border border-transparent",
          "text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400",
          "hover:bg-gray-100/50 dark:hover:bg-primary-900/30",
          isOpen &&
            "bg-gray-100/80 dark:bg-primary-900/50 border-gray-200/50 dark:border-primary-800/30",
        )}
      >
        <HiOutlineGlobeAlt
          className={cn("text-lg", isPending && "animate-pulse")}
        />
        <span className="hidden lg:block font-display">
          {activeLanguage?.label}
        </span>
        <span className="lg:hidden font-display">{locale.toUpperCase()}</span>
        <IoChevronDown
          className={cn(
            "text-xs transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute bottom-full mb-2 right-0 sm:bottom-auto sm:top-full sm:mt-2 w-32 z-[60]",
              "bg-white/90 dark:bg-primary-950/90 backdrop-blur-xl",
              "border border-gray-200/50 dark:border-primary-800/30 rounded-xl shadow-2xl shadow-black/10 overflow-hidden",
            )}
          >
            <div className="p-1">
              {languages.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onSelectChange(value)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    locale === value
                      ? "bg-accent-500/10 text-accent-600 dark:text-accent-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-primary-900/50 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  <span className="font-display">{label}</span>
                  {locale === value && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-1 rounded-full bg-accent-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
