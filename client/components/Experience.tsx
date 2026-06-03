"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import Reveal from "@/components/Reveal";
import experiences from "@/content/experiences";
import { useTranslations } from "next-intl";

import { FaBriefcase, FaRoad } from "react-icons/fa";

function Experience() {
  const t_experience = useTranslations("experience");
  const t = useTranslations();

  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 50%", "end 85%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 1],
  );

  return (
    <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaBriefcase className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t_experience("title")}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t_experience("subtitle")}
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <div className="w-full max-w-5xl">
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-primary-800" />
            <motion.div
              className="hidden md:block absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top h-full bg-gradient-to-b from-accent-500 via-accent-600 to-accent-400"
              style={{ scaleY: lineScaleY, opacity: lineOpacity }}
            />

            {/* Timeline Dot at Top */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-accent-500 rounded-full border-4 border-gray-50 dark:border-primary-950 z-10" />

            <div className="flex flex-col gap-12">
              {experiences.map((experience, i) => {
                const translatedExperience = {
                  ...experience,
                  name: t(experience.name as string),
                  date: t(experience.date as string),
                  description: t(experience.description as string),
                };

                const cardScrollStart = (i / experiences.length) * 0.75;

                return (
                  <TimelineItem
                    key={i}
                    index={i}
                    experience={translatedExperience}
                    scrollYProgress={scrollYProgress}
                    cardScrollStart={cardScrollStart}
                  />
                );
              })}
            </div>

            {/* Timeline End */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-8 items-center justify-center w-8 h-8 bg-gray-50 dark:bg-primary-900 rounded-full border-2 border-accent-500">
              <FaRoad className="text-accent-500 text-sm" />
            </div>
          </div>
        </div>
      </Reveal>
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
  console.log("cardScrollStart", cardScrollStart);
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
      {/* Timeline Dot with scroll animation */}
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 bg-accent-400 rounded-full border-4 border-gray-50 dark:border-primary-950 z-20 shadow-lg shadow-accent-500/30"
        style={{
          scale: dotScale,
          opacity: dotOpacity,
        }}
      />

      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
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

export default Experience;
