"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useViewModeStore } from "@/stores/useViewModeStore";
import { cn } from "@/utils/cn";
import {
  FaBars,
  FaCode,
  FaHome,
  FaUser,
  FaBriefcase,
  FaProjectDiagram,
  FaRocket,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const navLinkClass =
  "relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const titulo = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const setIs3D = useViewModeStore((state) => state.setIs3D);
  const is3D = useViewModeStore((state) => state.is3D);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/" || href.startsWith("/#")) {
        const section = href.includes("#") ? href.split("#")[1] : "home";
        return pathname === "/" && activeSection === section;
      }
      return pathname === href;
    },
    [pathname, activeSection],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "experience"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id && sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const links = [
    { text: t("home"), href: "/", icon: <FaHome /> },
    { text: t("about"), href: "/#about", icon: <FaUser /> },
    { text: t("projects"), href: "/#projects", icon: <FaProjectDiagram /> },
    { text: t("experience"), href: "/#experience", icon: <FaBriefcase /> },
    { text: t("apps"), href: "/apps", icon: <FaRocket /> },
  ];

  const desktopLinks = links.slice(1);

  const typedTitles = useMemo(
    () => [
      t("titles.0"),
      t("titles.1"),
      t("titles.2"),
      t("titles.3"),
      t("titles.4"),
    ],
    [t],
  );

  const typedTitleWidthCh = useMemo(
    () => Math.max(...typedTitles.map((title) => title.length)),
    [typedTitles],
  );

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const sectionId = href.split("#")[1];
    if (!sectionId) return;

    setIs3D(false);
    setActiveSection(sectionId);
    setIsOpen(false);

    if (pathname === "/") {
      e.preventDefault();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        });
      });
    }
  };

  useEffect(() => {
    const typed = new Typed(titulo.current, {
      strings: typedTitles,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [typedTitles]);

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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out",
        scrolled || isOpen
          ? "top-3 w-[calc(100%-1.5rem)] max-w-5xl px-4 py-2.5"
          : "top-5 w-[calc(100%-2rem)] max-w-5xl px-5 py-3",
        isOpen ? "rounded-[2rem]" : "rounded-full",
        "border border-white/30 bg-white/20 shadow-lg shadow-black/5 backdrop-blur-2xl backdrop-saturate-150",
        "ring-1 ring-inset ring-white/40 dark:border-white/10 dark:bg-white/5 dark:shadow-black/40 dark:ring-white/10",
        scrolled && !isOpen && "bg-white/30 dark:bg-white/8",
      )}
    >
      <div className="mx-auto grid h-9 max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Brand */}
        <Link
          className="group flex min-w-0 items-center gap-2.5 justify-self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
          onClick={() => setIsOpen(false)}
          href="/"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/25 transition-colors duration-200 group-hover:border-accent-400/50 group-hover:bg-accent-500/80 dark:border-white/15 dark:bg-white/10 dark:group-hover:bg-accent-400/80">
            <FaCode className="text-xs text-primary-900 transition-colors duration-200 group-hover:text-white dark:text-primary-50 dark:group-hover:text-primary-950" />
          </div>
          <div
            className="hidden overflow-hidden sm:block"
            style={{ width: `${typedTitleWidthCh}ch` }}
          >
            <span
              ref={titulo}
              className="inline whitespace-nowrap font-display text-sm font-semibold tracking-tight text-primary-900 dark:text-primary-50"
            >
              {t("brand.name")}
            </span>
          </div>
        </Link>

        {/* Desktop navigation — pinned to center column */}
        <div className="hidden items-center gap-0.5 justify-self-center md:flex">
          {desktopLinks.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              onClick={
                href.startsWith("/#")
                  ? (e) => handleSectionClick(e, href)
                  : undefined
              }
              className={cn(
                navLinkClass,
                isActive(href)
                  ? "text-primary-900 dark:text-primary-50"
                  : "text-primary-500 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-100",
              )}
            >
              <span className="relative z-10">{text}</span>
              {isActive(href) && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-x-2 bottom-1 h-px bg-accent-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
          <div className="hidden items-center sm:flex">
            <LanguageSwitcher />
            {!is3D && (
              <>
                <span
                  aria-hidden
                  className="mx-1.5 h-3.5 w-px bg-white/30 dark:bg-white/15"
                />
                <ThemeToggle />
              </>
            )}
          </div>

          <Link
            href="/contact"
            className="hidden rounded-full bg-accent-500/90 px-4 py-2 text-[13px] font-semibold tracking-wide text-white shadow-sm shadow-accent-500/20 backdrop-blur-sm transition-colors duration-200 hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 lg:inline-flex"
          >
            {t("contact")}
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary-800 transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 md:hidden dark:text-primary-100 dark:hover:bg-white/10"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <RxCross2 className="text-lg" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <FaBars className="text-base" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="mt-3 border-t border-white/25 pt-2 dark:border-white/10">
              <ul className="flex flex-col">
                {links.map(({ text, href, icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={
                        href.startsWith("/#")
                          ? (e) => handleSectionClick(e, href)
                          : () => setIsOpen(false)
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-2 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40",
                        isActive(href)
                          ? "bg-white/20 text-accent-600 dark:bg-white/10 dark:text-accent-400"
                          : "text-primary-700 hover:bg-white/15 dark:text-primary-200 dark:hover:bg-white/10",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                          isActive(href)
                            ? "bg-accent-500/15 text-accent-600 dark:text-accent-400"
                            : "bg-white/20 text-primary-600 dark:bg-white/10 dark:text-primary-300",
                        )}
                      >
                        {icon}
                      </span>
                      {text}
                      {isActive(href) && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-center justify-between border-t border-white/25 px-2 py-3 dark:border-white/10">
                <div className="flex items-center gap-1">
                  <LanguageSwitcher />
                  {!is3D && (
                    <>
                      <span
                        aria-hidden
                        className="mx-1 h-3.5 w-px bg-white/30 dark:bg-white/15"
                      />
                      <ThemeToggle />
                    </>
                  )}
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-accent-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-accent-500/20 transition-colors hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50"
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
