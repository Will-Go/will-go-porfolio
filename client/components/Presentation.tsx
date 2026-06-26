"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { unstable_ViewTransition as ViewTransition } from "react";
import { useTranslations } from "next-intl";

// COMPONENTS
import BackgroundBlur from "@/components/BackgroundBlur";
import Reveal from "@/components/Reveal";

export default function Presentation() {
  const t = useTranslations();

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
      {/* Synthetic "Video" Mesh Gradient (Reliable & Premium) */}

      <div className="relative z-10 space-y-8">
        {/* Central Avatar/Icon Element */}
        <Reveal animationType="scale" duration={1.2} easing="backOut">
          <div className="relative inline-block">
            <ViewTransition name="Wilson-avatar">
              <div className="relative group">
                <Image
                  src="/Wilson.png"
                  alt="Wilson - Software Engineer"
                  width={200}
                  height={200}
                  className="relative rounded-full w-40 h-40 md:w-52 md:h-52 object-cover border-2 border-white/20 dark:border-primary-800/50 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </ViewTransition>
          </div>
        </Reveal>

        {/* Text Content */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <Reveal animationType="fadeUp" delay={0.2} duration={1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1] text-gray-900 dark:text-white">
              {t("home.name")}
            </h1>
          </Reveal>

          <Reveal animationType="fadeUp" delay={0.4} duration={1}>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-primary-300 font-medium">
              {t("home.title")}
            </h2>
          </Reveal>

          <Reveal animationType="fadeUp" delay={0.6} duration={1}>
            <p className="text-base sm:text-lg text-gray-500 dark:text-primary-400 leading-relaxed max-w-2xl mx-auto">
              {t("home.description", { location: t("home.location") })}
            </p>
          </Reveal>
        </div>

        {/* Action Buttons */}
        <Reveal animationType="scale" delay={0.8} duration={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="#projects"
              className="group relative flex items-center justify-center px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/20 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">{t("home.viewWork")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="#about"
              className="flex items-center justify-center px-8 py-3.5 border border-gray-200 dark:border-primary-800/50 text-gray-700 dark:text-primary-200 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-primary-900/50 transition-all duration-300 active:scale-95"
            >
              {t("home.learnMore")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
