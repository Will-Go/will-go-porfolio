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
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

export default function HomePageServer() {
  return (
    <>
      <ChatBubble />
      <div className="relative p-4 md:p-12 lg:p-20 selection:text-black selection:bg-slate-300 overflow-x-clip animate-fade-in">
        <HeroMorphOrb />
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <FadeInOut distance={20} threshold={0.1} className="relative z-10">
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
          className="relative left-1/2 flex min-h-screen w-screen max-w-[100vw] -translate-x-1/2 items-center justify-center"
        >
          <FadeInOut distance={20} threshold={0.1} className="w-full">
            <Reveal
              animationType="scale"
              duration={1}
              easing="backOut"
              scale={0.9}
              className="w-full"
            >
              <hr />
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
                    <div className="flex items-center gap-3">
                      <FaSpinner className="text-2xl text-accent-500 animate-spin" />
                      {/* <span className="text-primary-300">
                        {t("projects.loading")}
                      </span> */}
                    </div>
                  </div>
                }
              >
                <Projects />
              </Suspense>
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
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
                    <div className="flex items-center gap-3">
                      <FaSpinner className="text-2xl text-accent-500 animate-spin" />
                    </div>
                  </div>
                }
              >
                <Skills />
              </Suspense>
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
    </>
  );
}
