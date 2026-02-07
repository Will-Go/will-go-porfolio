//COMPONENTS
import Image from "next/image";
import BackgroundBlur from "@/components/BackgroundBlur";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      {/* <Presentation /> */}{" "}
      <section className="relative flex flex-col justify-center items-center min-h-[80vh] md:flex-row gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
        {" "}
        <div className="flex-1 max-w-2xl text-center md:text-left space-y-6">
          <Reveal animationType="slideDown" duration={1.2} easing="backOut">
            <div className="space-y-2">
              <p className="text-accent-600 dark:text-accent-400 text-sm md:text-base font-medium tracking-wider uppercase">
                {t("home.welcome")}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent leading-tight">
                {t("home.name")}
              </h1>
            </div>
          </Reveal>

          <Reveal
            animationType="fadeRight"
            delay={0.3}
            duration={1}
            easing="easeOut"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-primary-300 font-semibold">
              {t("home.title")}
            </h2>
          </Reveal>

          <Reveal
            animationType="fadeUp"
            delay={0.5}
            duration={0.8}
            easing="easeOut"
          >
            <p className="text-base sm:text-lg text-gray-600 dark:text-primary-400 leading-relaxed max-w-xl">
              {t("home.description", { location: t("home.location") })}
            </p>
          </Reveal>

          <Reveal
            animationType="scale"
            delay={0.7}
            duration={0.8}
            easing="backOut"
          >
            <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 pt-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-primary-950 transition-all duration-200 transform hover:scale-105"
              >
                {t("home.viewWork")}
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-primary-700 text-gray-700 dark:text-primary-200 font-semibold rounded-xl hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-primary-950 transition-all duration-200"
              >
                {t("home.learnMore")}
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative flex-shrink-0">
          <Reveal
            animationType="rotateIn"
            delay={0.2}
            duration={1}
            easing="backOut"
          >
            <div className="relative">
              <ViewTransition name="Wilson-avatar">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <Image
                    src="/Wilson.png"
                    alt="Wilson - Software Engineer"
                    width={280}
                    height={280}
                    className="relative rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover border-4 border-gray-200 dark:border-primary-800/50 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-500/10 to-transparent"></div>
                </div>
              </ViewTransition>
            </div>
          </Reveal>
        </div>
        <BackgroundBlur className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 opacity-30" />
      </section>{" "}
      <Reveal animationType="fadeIn" duration={0.8} easing="easeOut">
        <hr id="about" />
        <About />
      </Reveal>
      <Reveal animationType="scale" duration={1} easing="backOut" scale={0.9}>
        <hr id="projects" />
        <Projects />
      </Reveal>
      <Reveal
        animationType="slideLeft"
        duration={0.8}
        easing="easeOut"
        distance={30}
      >
        <hr />
        <Skills />
      </Reveal>
      <Reveal
        animationType="slideRight"
        duration={0.8}
        easing="easeOut"
        distance={30}
      >
        <hr />
        <Education />
      </Reveal>
      <Reveal
        animationType="fadeUp"
        duration={0.8}
        easing="easeOut"
        distance={40}
      >
        <hr id="experience" />
        <Experience />
      </Reveal>
    </main>
  );
}
