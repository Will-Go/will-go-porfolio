"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { unstable_ViewTransition as ViewTransition } from "react";
import { useTranslations } from "next-intl";

// COMPONENTS
import BackgroundBlur from "@/components/BackgroundBlur";
import DescriptionReveal from "@/components/DescriptionReveal";
import Reveal from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

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

          <DescriptionReveal
            duration={1}
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg dark:text-primary-400"
          >
            {t("home.description", { location: t("home.location") })}
          </DescriptionReveal>
        </div>

        {/* Action Buttons */}
        <Reveal animationType="scale" delay={0.8} duration={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="#projects"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              {t("home.viewWork")}
            </Link>
            <Link
              href="#about"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t("home.learnMore")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
