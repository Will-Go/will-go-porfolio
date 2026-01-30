"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
  const titulo = useRef(null);
  const navRef = useRef(null);
  const t = useTranslations("navigation");

  const links = [
    { text: t("home"), href: "/", icon: <FaHome /> },
    { text: t("about"), href: "/#about", icon: <FaUser /> },
    { text: t("experience"), href: "/#experience", icon: <FaBriefcase /> },
    { text: t("projects"), href: "/#projects", icon: <FaProjectDiagram /> },
    { text: t("contact"), href: "/contact", icon: <FaEnvelope /> },
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
        "fixed left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-50 transition-all duration-500 ease-in-out",
        isOpen
          ? "top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-primary-950/95 via-primary-900/95 to-accent-950/20 backdrop-blur-xl border-none rounded-none"
          : "top-1 bg-gradient-to-r from-primary-950/80 via-primary-900/90 to-primary-950/80 backdrop-blur-xl border border-primary-800/40 rounded-xl shadow-lg shadow-accent-500/5",
      )}
    >
      <div className="flex justify-between items-center px-2 py-1.5 lg:px-3 lg:py-2">
        {/* Brand Logo */}
        <Link
          className="group flex items-center gap-3 min-w-fit"
          onClick={() => setIsOpen(false)}
          href={"/"}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative p-2 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full border border-accent-500/30">
              <FaCode className="text-accent-400 text-lg" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span
              ref={titulo}
              className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent"
            >
              {t("brand.name")}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation and Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 lg:gap-2">
            {links.map(({ text, href, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-300 hover:text-accent-300 transition-all duration-300 hover:bg-accent-500/10 hover:shadow-lg hover:shadow-accent-500/20"
                >
                  <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {icon}
                  </span>
                  <span className="relative">
                    {text}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-full transition-all duration-300"></div>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative p-3 rounded-xl bg-primary-900/50 border border-primary-800/60 text-primary-200 hover:border-accent-500/60 hover:text-accent-300 hover:bg-accent-500/10 transition-all duration-300 group"
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <RxCross2 className="text-lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <FaBars className="text-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center justify-center min-h-screen px-8"
          >
            <div className="space-y-6 text-center">
              {/* Mobile Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent mb-2">
                  {t("brand.name")}
                </h2>
                <p className="text-primary-400 text-sm">{t("brand.title")}</p>
              </motion.div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {links.map(({ text, href, icon }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary-900/50 to-primary-800/50 border border-primary-800/40 text-primary-200 hover:border-accent-500/60 hover:text-accent-300 hover:bg-gradient-to-r hover:from-accent-500/10 hover:to-accent-600/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/20"
                    >
                      <span className="text-accent-400 text-xl">{icon}</span>
                      <span className="text-xl font-medium">{text}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 rounded-full border border-accent-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-primary-300 text-xs">
                    {t("brand.subtitle")}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
