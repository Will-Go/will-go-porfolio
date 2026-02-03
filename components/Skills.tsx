"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import BackgroundBlur from "@/components/BackgroundBlur";
import Reveal from "@/components/Reveal";
import techSkills from "@/content/techSkills";
import { useTranslations } from "next-intl";

//ICONS
import { FaCode, FaStar } from "react-icons/fa";

function Skills() {
  const t = useTranslations();
  const controls = useAnimation();
  const refSkills = useRef<HTMLHeadingElement | null>(null);
  const isInViewSkills = useInView(refSkills, { once: true });

  useEffect(() => {
    if (isInViewSkills) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [isInViewSkills, controls]);

  return (
    <div
      id="skills"
      className="relative flex flex-col items-center justify-center my-16 gap-8 px-4"
    >
      <BackgroundBlur className="h-96 w-96 opacity-30" />

      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaCode className="text-3xl text-accent-500" />
            <h1
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent"
              ref={refSkills}
            >
              {t("skills.title")}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>
      </Reveal>

      <Reveal
        animationType="fadeIn"
        delay={0.3}
        duration={1}
        easing="easeOut"
        className="!z-50 "
      >
        <div className="w-full max-w-6xl ">
          {isInViewSkills && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
              {techSkills.map((techSkill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="group w-full max-w-[140px]"
                >
                  <div className="relative flex flex-col rounded-2xl items-center justify-center text-center border-2 border-gray-200 dark:border-primary-800/60 cursor-default p-4 bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 dark:from-primary-950/80 dark:via-primary-900/60 dark:to-primary-950/80 hover:border-accent-500/60 hover:bg-gradient-to-br hover:from-accent-500/10 hover:via-white/60 hover:to-accent-500/10 dark:hover:from-accent-900/20 dark:hover:via-primary-900/60 dark:hover:to-accent-950/20 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-accent-500/20">
                    {/* Skill Name */}
                    <span className="text-xs font-medium text-gray-700 dark:text-primary-200 group-hover:text-accent-500 dark:group-hover:text-accent-300 transition-colors duration-300 text-center leading-tight">
                      {techSkill}
                    </span>

                    {/* Floating Stars Effect on Hover */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      <FaStar className="text-accent-400 text-xs animate-pulse" />
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-3/4 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Skills Count */}
      <Reveal animationType="scale" delay={0.6} duration={0.8} easing="backOut">
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-accent-500/70 dark:bg-accent-500/20 rounded-full border border-accent-500/30 text-black! dark:text-blue-200!">
            {t("skills.technologies", { count: techSkills.length })}
          </span>
        </div>
      </Reveal>
    </div>
  );
}

export default Skills;
