"use client";

import { useEffect } from "react";
import ThreeExperience from "@/components/three/Experience";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import FadeInOut from "@/components/FadeInOut";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Presentation from "@/components/Presentation";
import { useTranslations } from "next-intl";
import { FaCube, FaScroll } from "react-icons/fa";
import ChatBubble from "@/components/ChatBubble";
import { useViewModeStore } from "@/stores/useViewModeStore";

export default function HomePage() {
  const t = useTranslations();
  const is3D = useViewModeStore((state) => state.is3D);
  const toggleView = useViewModeStore((state) => state.toggleView);

  useEffect(() => {
    if (is3D) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [is3D]);

  if (is3D) {
    return (
      <div className="relative p-4 md:p-12 lg:p-20 selection:text-black selection:bg-slate-300 overflow-x-clip animate-fade-in">
        <ThreeExperience />
        <button
          type="button"
          onClick={toggleView}
          className="fixed top-28 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-accent-500/20 text-xs text-gray-300 hover:text-white hover:border-accent-500/40 transition-all duration-300 cursor-pointer"
          title={t("common.seeMore")}
        >
          <FaScroll className="text-accent-500" />
          <span className="hidden sm:inline">{t("home.viewWork")}</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <ChatBubble />
      <div className="relative p-4 md:p-12 lg:p-20 selection:text-black selection:bg-slate-300 overflow-x-clip animate-fade-in">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={20} threshold={0.1}>
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
        <section
          id="about"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={20} threshold={0.1}>
            <Reveal animationType="fadeIn" duration={0.8} easing="easeOut">
              <hr />
              <About />
            </Reveal>
          </FadeInOut>
        </section>
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={20} threshold={0.1}>
            <Reveal
              animationType="scale"
              duration={1}
              easing="backOut"
              scale={0.9}
            >
              <hr />
              <Projects />
            </Reveal>
          </FadeInOut>
        </section>
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={30} threshold={0.1}>
            <Reveal
              animationType="slideLeft"
              duration={0.8}
              easing="easeOut"
              distance={30}
            >
              <hr />
              <Skills />
            </Reveal>
          </FadeInOut>
        </section>
        <section
          id="education"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={30} threshold={0.1}>
            <Reveal
              animationType="slideRight"
              duration={0.8}
              easing="easeOut"
              distance={30}
            >
              <hr />
              <Education />
            </Reveal>
          </FadeInOut>
        </section>
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center"
        >
          <FadeInOut distance={80} threshold={0.1}>
            <Reveal
              animationType="fadeUp"
              duration={0.8}
              easing="easeOut"
              distance={80}
            >
              <hr />
              <Experience />
            </Reveal>
          </FadeInOut>
        </section>
      </div>
      <button
        type="button"
        onClick={toggleView}
        className="fixed top-28 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-primary/20 text-xs text-gray-300 hover:text-white hover:border-primary/40 transition-all duration-300 cursor-pointer"
        title="Switch to 3D"
      >
        <FaCube className="text-primary" />
        <span className="hidden sm:inline">3D View</span>
      </button>
    </>
  );
}
