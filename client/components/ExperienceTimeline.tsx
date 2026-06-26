"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  scroll,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { FaRoad } from "react-icons/fa";
import ExperienceCard from "@/components/ExperienceCard";
import experiences from "@/content/experiences";

const TIMELINE_OFFSET: NonNullable<Parameters<typeof scroll>[1]>["offset"] = [
  "start 50%",
  "end 85%",
];

interface IExperienceTimelineProps {
  scrollContainer?: HTMLElement | null;
}

function useTimelineScrollProgress(scrollContainer?: HTMLElement | null) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const target = timelineRef.current;
    if (!target) return;

    return scroll(
      (_progress, { y }) => {
        scrollYProgress.set(y.progress);
      },
      {
        ...(scrollContainer ? { container: scrollContainer } : {}),
        target,
        offset: TIMELINE_OFFSET,
      },
    );
  }, [scrollContainer, scrollYProgress]);

  return { timelineRef, scrollYProgress };
}

export default function ExperienceTimeline({
  scrollContainer,
}: IExperienceTimelineProps) {
  const t = useTranslations();
  const { timelineRef, scrollYProgress } =
    useTimelineScrollProgress(scrollContainer);

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 1],
  );

  return (
    <div className="w-full max-w-5xl">
      <div ref={timelineRef} className="relative pb-8">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gray-200 md:block dark:bg-primary-800" />
        <motion.div
          className="absolute top-0 left-1/2 hidden h-full w-0.5 origin-top -translate-x-1/2 bg-linear-to-b from-accent-500 via-accent-600 to-accent-400 md:block"
          style={{ scaleY: lineScaleY, opacity: lineOpacity }}
        />

        <div className="absolute left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-2 rounded-full border-4 border-gray-50 bg-accent-500 md:block dark:border-primary-950" />

        <div className="flex flex-col gap-6">
          {experiences.map((experience, index) => {
            const translatedExperience = {
              ...experience,
              name: t(experience.name as string),
              date: t(experience.date as string),
              description: t(experience.description as string),
            };

            const cardScrollStart = (index / experiences.length) * 0.75;

            return (
              <TimelineItem
                key={experience.companyUrl ?? experience.name}
                index={index}
                experience={translatedExperience}
                scrollYProgress={scrollYProgress}
                cardScrollStart={cardScrollStart}
              />
            );
          })}
        </div>

        <div className="absolute bottom-0 left-1/2 hidden h-8 w-8 translate-y-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent-500 bg-gray-50 md:flex dark:bg-primary-900">
          <FaRoad className="text-sm text-accent-500" />
        </div>
      </div>
    </div>
  );
}

interface ITimelineItemProps {
  index: number;
  experience: {
    name: string;
    date: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    companyUrl?: string;
  };
  scrollYProgress: MotionValue<number>;
  cardScrollStart: number;
}

function TimelineItem({
  index,
  experience,
  scrollYProgress,
  cardScrollStart,
}: ITimelineItemProps) {
  const isLeft = index % 2 === 0;
  const animStart = cardScrollStart - 0.04;
  const animEnd = cardScrollStart + 0.12;

  const dotScale = useTransform(
    scrollYProgress,
    [cardScrollStart - 0.05, cardScrollStart + 0.05],
    [0, 1],
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [cardScrollStart - 0.03, cardScrollStart + 0.05],
    [0, 1],
  );

  const cardX = useTransform(
    scrollYProgress,
    [animStart, animEnd],
    [isLeft ? -160 : 160, 0],
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [animStart, animEnd],
    [0.25, 1],
  );
  const cardRotate = useTransform(
    scrollYProgress,
    [animStart, animEnd],
    [isLeft ? -4 : 4, 0],
  );

  return (
    <div className="relative">
      <motion.div
        className="absolute top-8 left-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-gray-50 bg-accent-400 shadow-lg shadow-accent-500/30 md:block dark:border-primary-950"
        style={{
          scale: dotScale,
          opacity: dotOpacity,
        }}
      />

      <div className="md:grid md:grid-cols-2 md:items-center md:gap-8">
        {isLeft ? (
          <motion.div
            className="md:pr-4"
            style={{ x: cardX, opacity: cardOpacity, rotate: cardRotate }}
          >
            <ExperienceCard index={index} {...experience} isLeft={true} />
          </motion.div>
        ) : (
          <>
            <div />
            <motion.div
              className="md:pl-4"
              style={{ x: cardX, opacity: cardOpacity, rotate: cardRotate }}
            >
              <ExperienceCard index={index} {...experience} isLeft={false} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
