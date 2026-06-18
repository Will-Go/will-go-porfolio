"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import ProjectCard from "@/components/ProjectCard";
import type Project from "@/interfaces/IProject";
import { cn } from "@/utils/cn";

const VISIBLE_RANGE = 2;

interface IProjectsCarouselProps {
  projects: Project[];
}

function getWrappedOffset(
  index: number,
  activeIndex: number,
  total: number,
): number {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function useCarouselMetrics() {
  const [metrics, setMetrics] = useState({ spacing: 260, cardWidth: 420 });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const cardWidth = Math.min(Math.max(width * 0.28, 320), 520);
      const spacing = Math.min(Math.max(width * 0.2, 110), 320);

      setMetrics({ spacing, cardWidth });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

export default function ProjectsCarousel({ projects }: IProjectsCarouselProps) {
  const t = useTranslations("projects.carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const { spacing, cardWidth } = useCarouselMetrics();
  const total = projects.length;

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goTo(1);
    else if (info.offset.x > threshold) goTo(-1);
  };

  const visibleSlides = projects
    .map((project, index) => ({
      project,
      index,
      offset: getWrappedOffset(index, activeIndex, total),
    }))
    .filter(({ offset }) => Math.abs(offset) <= VISIBLE_RANGE);

  return (
    <section
      className="relative w-full select-none"
      aria-roledescription="carousel"
      aria-label={t("label")}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-[10%] top-1/2 h-[55%] -translate-y-1/2 rounded-full bg-accent-500/8 blur-[80px]" />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-accent-500/25 to-transparent" />
      </div>

      <div
        className="relative mx-auto flex h-[min(78vh,720px)] min-h-[520px] w-full items-center justify-center overflow-visible"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="relative h-full w-full transform-3d"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {visibleSlides.map(({ project, index, offset }) => {
            const isCenter = offset === 0;
            const distance = Math.abs(offset);
            const direction = Math.sign(offset);

            return (
              <motion.div
                key={`${project.name}-${index}`}
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  !isCenter && "cursor-pointer",
                )}
                style={{
                  width: cardWidth,
                  zIndex: VISIBLE_RANGE - distance + (isCenter ? 1 : 0),
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  x: offset * spacing,
                  rotateY: offset * -32,
                  z: -distance * 90,
                  scale: isCenter ? 1.1 : 1 - distance * 0.1,
                  opacity: isCenter ? 1 : 1 - distance * 0.22,
                  filter: isCenter ? "blur(0px)" : `blur(${distance * 0.6}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (!isCenter) goToIndex(index);
                }}
                aria-hidden={!isCenter}
              >
                <motion.div
                  className="transform-3d"
                  style={{
                    rotateY: direction * (isCenter ? 0 : 4),
                  }}
                >
                  <ProjectCard index={index} isActive={isCenter} {...project} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="relative z-10 mt-2 flex items-center justify-center gap-6 px-4">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="group flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent-500/60 hover:bg-accent-500/15 hover:text-accent-500 dark:border-primary-700/60 dark:bg-primary-900/80 dark:text-primary-200 dark:hover:text-accent-300"
          aria-label={t("previous")}
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={`dot-${project.name}-${index}`}
              type="button"
              onClick={() => goToIndex(index)}
              className={cn(
                "h-2 rounded-full cursor-pointer transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-accent-500"
                  : "w-2 bg-gray-300 hover:bg-accent-500/50 dark:bg-primary-600 dark:hover:bg-accent-500/50",
              )}
              aria-label={t("goToProject", { name: project.name })}
              aria-current={index === activeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(1)}
          className="group flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent-500/60 hover:bg-accent-500/15 hover:text-accent-500 dark:border-primary-700/60 dark:bg-primary-900/80 dark:text-primary-200 dark:hover:text-accent-300"
          aria-label={t("next")}
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      <p className="mt-4 text-center text-xs tracking-[0.2em] text-gray-400 uppercase dark:text-primary-500">
        {t("hint")}
      </p>
    </section>
  );
}
