"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import Typed from "typed.js";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePanelStore } from "@/stores/usePanelStore";
import { useIntroStore } from "@/stores/useIntroStore";
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

const NAV_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
  mass: 0.85,
};

const NAV_CONTENT_SPRING = {
  type: "spring" as const,
  stiffness: 480,
  damping: 38,
  mass: 0.75,
};

interface INavbarProps {
  isMobileOrTablet?: boolean;
}

export default function Navbar({ isMobileOrTablet = false }: INavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const titulo = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const setIs3D = useViewModeStore((state) => state.setIs3D);
  const is3D = useViewModeStore((state) => state.is3D);
  const expandedPanel = usePanelStore((state) => state.expandedPanel);
  const introComplete = useIntroStore((state) => state.introComplete);
  const panelOpen =
    !isMobileOrTablet && (expandedPanel !== null || (is3D && !introComplete));

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
          if (lenis) {
            lenis.scrollTo(`#${sectionId}`, {
              duration: 1.2,
              easing: (t: number) => 1 - (1 - t) ** 3,
            });
            return;
          }

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

  const isCompactNav = scrolled || isOpen;

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -12 }}
        animate={{
          opacity: 1,
          y: 0,
          width: panelOpen ? 56 : "min(calc(100vw - 1.5rem), 64rem)",
        }}
        transition={{
          opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          width: NAV_SPRING,
        }}
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 rounded-full py-2",
          panelOpen ? "overflow-hidden" : "overflow-visible",
          isCompactNav || panelOpen ? "top-3" : "top-5",
          panelOpen
            ? "border-0 bg-black shadow-none ring-0 backdrop-blur-none dark:bg-black"
            : cn(
                "bg-white/20 shadow-lg shadow-black/5 backdrop-blur-2xl backdrop-saturate-150 dark:bg-white/5 dark:shadow-black/40",
                !isOpen &&
                  "border border-white/30 ring-1 ring-inset ring-white/40 dark:border-white/10 dark:ring-white/10",
                isOpen && "border border-transparent ring-0 dark:bg-black/60",
                scrolled && !isOpen && "bg-white/30 dark:bg-white/8",
              ),
        )}
      >
        <div
          className={cn(
            "flex h-9 w-full min-w-0 items-center",
            panelOpen ? "overflow-hidden" : "overflow-visible",
            panelOpen
              ? "justify-center px-2 py-2"
              : "justify-between px-4 py-2.5",
          )}
        >
          {/* Brand */}
          <Link
            className="group flex shrink-0 items-center overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
            onClick={() => setIsOpen(false)}
            href="/"
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                panelOpen
                  ? "border-white/20 bg-white/10 group-hover:border-white/40 group-hover:bg-white/20"
                  : "border-white/30 bg-white/25 group-hover:border-accent-400/50 group-hover:bg-accent-500/80 dark:border-white/15 dark:bg-white/10 dark:group-hover:bg-accent-400/80",
              )}
            >
              <FaCode
                className={cn(
                  "text-xs transition-colors duration-200",
                  panelOpen
                    ? "text-white group-hover:text-white"
                    : "text-primary-900 group-hover:text-white dark:text-primary-50 dark:group-hover:text-primary-950",
                )}
              />
            </div>
            <motion.div
              layout="size"
              initial={false}
              animate={{
                width: panelOpen ? 0 : `${typedTitleWidthCh}ch`,
                opacity: panelOpen ? 0 : 1,
                marginLeft: panelOpen ? 0 : 10,
              }}
              transition={NAV_CONTENT_SPRING}
              className="hidden overflow-hidden sm:block"
            >
              <span
                ref={titulo}
                className={cn(
                  "inline whitespace-nowrap font-display text-sm font-semibold tracking-tight",
                  panelOpen
                    ? "text-white"
                    : "text-primary-900 dark:text-primary-50",
                )}
              >
                {t("brand.name")}
              </span>
            </motion.div>
          </Link>

          {/* Desktop navigation — pinned to center column */}
          <motion.div
            layout="size"
            initial={false}
            animate={{
              maxWidth: panelOpen ? 0 : 960,
              opacity: panelOpen ? 0 : 1,
              marginInline: panelOpen ? 0 : 8,
            }}
            transition={NAV_CONTENT_SPRING}
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-hidden md:flex"
            style={{ pointerEvents: panelOpen ? "none" : "auto" }}
          >
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
                  "whitespace-nowrap",
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
          </motion.div>

          {/* Actions */}
          <motion.div
            layout="size"
            initial={false}
            animate={{
              maxWidth: panelOpen ? 0 : 420,
              opacity: panelOpen ? 0 : 1,
              marginLeft: panelOpen ? 0 : 8,
            }}
            transition={NAV_CONTENT_SPRING}
            className={cn(
              "flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2",
              panelOpen ? "overflow-hidden" : "overflow-visible",
            )}
            style={{ pointerEvents: panelOpen ? "none" : "auto" }}
          >
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
          </motion.div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu — separate from the pill so it doesn't morph */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex h-dvh flex-col md:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-white/25 backdrop-blur-2xl backdrop-saturate-150 dark:bg-black/60"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
              className="relative flex min-h-0 flex-1 flex-col px-6 pb-8 pt-24"
            >
              <ul className="flex flex-1 flex-col justify-center gap-1">
                {links.map(({ text, href, icon }, index) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.08 + index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={href}
                      onClick={
                        href.startsWith("/#")
                          ? (e) => handleSectionClick(e, href)
                          : () => setIsOpen(false)
                      }
                      className={cn(
                        "flex items-center gap-4 rounded-2xl px-3 py-4 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40",
                        isActive(href)
                          ? "bg-white/25 text-accent-600 dark:bg-white/10 dark:text-accent-400"
                          : "text-primary-800 hover:bg-white/20 dark:text-primary-100 dark:hover:bg-white/10",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full text-base",
                          isActive(href)
                            ? "bg-accent-500/15 text-accent-600 dark:text-accent-400"
                            : "bg-white/25 text-primary-700 dark:bg-white/10 dark:text-primary-200",
                        )}
                      >
                        {icon}
                      </span>
                      {text}
                      {isActive(href) && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-accent-500" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  duration: 0.25,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-auto flex items-center justify-between border-t border-white/25 pt-6 dark:border-white/10"
              >
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
                  className="rounded-full bg-accent-500/90 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-500/20 transition-colors hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50"
                >
                  {t("contact")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
