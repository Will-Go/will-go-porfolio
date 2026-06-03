//COMPONENTS
import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Presentation from "@/components/Presentation";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();

  return (
    <main className="relative min-h-screen p-4 md:p-12 lg:p-20 selection:text-black selection:bg-slate-300 overflow-x-clip animate-fade-in">
      <Presentation />
      <Reveal
        animationType="fadeIn"
        duration={0.8}
        easing="easeOut"
        fadeOutOnExit
      >
        <hr id="about" />
        <About />
      </Reveal>
      <Reveal
        animationType="scale"
        duration={1}
        easing="backOut"
        scale={0.9}
        fadeOutOnExit
      >
        <hr id="projects" />
        <Projects />
      </Reveal>
      <Reveal
        animationType="slideLeft"
        duration={0.8}
        easing="easeOut"
        distance={30}
        fadeOutOnExit
      >
        <hr />
        <Skills />
      </Reveal>
      <Reveal
        animationType="slideRight"
        duration={0.8}
        easing="easeOut"
        distance={30}
        fadeOutOnExit
      >
        <hr />
        <Education />
      </Reveal>
      <Reveal
        animationType="fadeUp"
        duration={0.8}
        easing="easeOut"
        distance={80}
        fadeOutOnExit
      >
        <hr id="experience" />
        <Experience />
      </Reveal>
    </main>
  );
}
