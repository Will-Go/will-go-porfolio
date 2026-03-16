"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

//UTILS
import { cn } from "@/utils/cn";

//ICONS
import {
  FaBars,
  FaCode,
  FaHome,
  FaUser,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
  FaRocket,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const titulo = useRef(null);
  const navRef = useRef(null);
  const t = useTranslations("navigation");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { text: t("home"), href: "/", icon: <FaHome /> },
    { text: t("about"), href: "/#about", icon: <FaUser /> },
    { text: t("experience"), href: "/#experience", icon: <FaBriefcase /> },
    { text: t("projects"), href: "/#projects", icon: <FaProjectDiagram /> },
    { text: t("apps"), href: "/apps", icon: <FaRocket /> },
  ];

  useEffect(() => {
    const titles = [
      t("titles.0"),
      t("titles.1"),
      t("titles.2"),
      t("titles.3"),
      t("titles.4"),
    ];

    const typed = new Typed(titulo.current, {
      strings: titles,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [t]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
        scrolled || isOpen
          ? "top-2 w-[calc(100%-1.5rem)] max-w-4xl px-3 py-1.5 bg-white/80 dark:bg-primary-950/80 backdrop-blur-xl border border-gray-200/30 dark:border-primary-800/20 rounded-2xl shadow-2xl shadow-black/10"
          : "top-6 w-[calc(100%-2rem)] max-w-5xl px-4 py-2 bg-white/70 dark:bg-primary-950/70 backdrop-blur-md border border-gray-200/50 dark:border-primary-800/30 rounded-2xl shadow-xl shadow-black/5",
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link
          className="group flex items-center gap-2 px-2 py-1 rounded-xl transition-all duration-300"
          onClick={() => setIsOpen(false)}
          href={"/"}
        >
          <div className="relative flex items-center justify-center p-2 bg-accent-500/10 rounded-lg border border-accent-500/20 group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-300">
            <FaCode className="text-accent-500 text-base group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="hidden sm:inline-flex min-w-[160px] lg:max-w-[200px]">
            <span
              ref={titulo}
              className="text-base font-bold bg-gradient-to-r max-w-[150px] text-nowrap! from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent"
            >
              {t("brand.name")}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/30 dark:bg-primary-900/40 p-1 rounded-xl border border-gray-200/20 dark:border-primary-800/20">
          {links.slice(1, 5).map(({ text, href, icon }, i) => (
            <Link
              key={i}
              href={href}
              className="relative px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition-all duration-300 rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm shadow-transparent hover:shadow-black/5 group"
            >
              <span className="relative z-10">{text}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <LanguageSwitcher />
            <div className="w-[1px] h-4 bg-gray-200 dark:bg-primary-800 mx-1"></div>
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-sm font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-gray-900/10 dark:shadow-white/5 active:scale-95"
          >
            {t("contact")}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 rounded-xl bg-gray-100/50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800/60 text-gray-700 dark:text-primary-200 hover:border-accent-500/60 hover:text-accent-600 dark:hover:text-accent-300 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute"
                  >
                    <RxCross2 className="text-xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute"
                  >
                    <FaBars className="text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-4 pb-2 border-t border-gray-100 dark:border-primary-800/30 mt-4">
              {links.map(({ text, href, icon }, i) => (
                <Link
                  key={i}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/50 dark:bg-primary-900/30 border border-transparent hover:border-accent-500/30 hover:bg-white dark:hover:bg-primary-800/50 transition-all duration-300"
                >
                  <span className="text-accent-500 text-lg">{icon}</span>
                  <span className="text-base font-medium text-gray-700 dark:text-primary-200">
                    {text}
                  </span>
                </Link>
              ))}
              <div className="flex items-center justify-between gap-4 p-3 mt-2 bg-gray-50/50 dark:bg-primary-900/30 rounded-xl border border-transparent">
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <div className="w-[1px] h-4 bg-gray-200 dark:bg-primary-800"></div>
                  <ThemeToggle />
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-sm font-bold rounded-lg shadow-md"
                >
                  {t("contact")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
