"use client";

import { Suspense } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import FadeInOut from "@/components/FadeInOut";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Presentation from "@/components/Presentation";
import HeroMorphOrb from "@/components/HeroMorphOrb";
import ChatBubble from "@/components/ChatBubble";
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/utils/cn";

const sectionShellClass =
  "relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden snap-start";

const fadeShellClass =
  "flex h-full max-h-full w-full flex-col justify-center overflow-hidden max-md:py-20 md:py-0";

function SectionSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-2">
      <FaSpinner className="animate-spin text-2xl text-accent-500" />
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <ChatBubble />
      <div className="relative animate-fade-in overflow-x-clip p-4 selection:bg-slate-300 selection:text-black md:p-8 ">
        <HeroMorphOrb />
        <div className="flex flex-col">
          <section
            id="home"
            data-snap-section
            className={cn(sectionShellClass, "overflow-hidden")}
          >
            <FadeInOut
              distance={80}
              threshold={2}
              className={cn(fadeShellClass, "relative z-10")}
            >
              <Reveal
                animationType="fadeIn"
                duration={0.8}
                easing="easeOut"
                threshold={0.1}
              >
                <Presentation />
              </Reveal>
            </FadeInOut>
          </section>
          <section id="about" data-snap-section className={sectionShellClass}>
            <FadeInOut distance={20} threshold={2} className={fadeShellClass}>
              <Reveal animationType="fadeIn" duration={0.8} easing="easeOut" className="w-full">
                <About />
              </Reveal>
            </FadeInOut>
          </section>
          <section
            id="projects"
            data-snap-section
            className={cn(
              sectionShellClass,
              "relative left-1/2 max-w-[100vw] -translate-x-1/2",
            )}
          >
            <FadeInOut distance={20} threshold={0.1} className={fadeShellClass}>
              <Reveal
                animationType="scale"
                duration={1}
                easing="backOut"
                scale={0.9}
                className="w-full"
              >
                <Suspense fallback={<SectionSpinner />}>
                  <Projects />
                </Suspense>
              </Reveal>
            </FadeInOut>
          </section>
          <section id="skills" data-snap-section className={sectionShellClass}>
            <FadeInOut distance={30} threshold={0.1} className={fadeShellClass}>
              <Reveal
                animationType="slideLeft"
                duration={0.8}
                easing="easeOut"
                distance={30}
                className="w-full"
              >
                <Suspense fallback={<SectionSpinner />}>
                  <Skills />
                </Suspense>
              </Reveal>
            </FadeInOut>
          </section>
          <section
            id="education"
            data-snap-section
            className={sectionShellClass}
          >
            <FadeInOut distance={30} threshold={0.1} className={fadeShellClass}>
              <Reveal
                animationType="slideRight"
                duration={0.8}
                easing="easeOut"
                distance={30}
                className="flex h-full w-full flex-col justify-center"
              >
                <Education />
              </Reveal>
            </FadeInOut>
          </section>
          <section
            id="experience"
            data-snap-section
            className="relative flex min-h-dvh w-full flex-col items-center justify-center py-8 snap-start"
          >
            <FadeInOut distance={20} threshold={0.2} className="relative w-full">
              <Reveal
                animationType="fadeUp"
                duration={0.8}
                easing="easeOut"
                distance={80}
              >
                <Experience />
              </Reveal>
            </FadeInOut>
          </section>
        </div>
      </div>
    </>
  );
}
