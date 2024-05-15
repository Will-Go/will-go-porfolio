"use client";
//COMPONENTS
import Presentation from "./Presentation";
import About from "./About";
import Skills from "./Skills";
import Reveal from "@/components/Reveal";
import Education from "./Education";
import Projects from "./Projects";
import ParticlesComponent from "@/components/particles";

export default function Home() {
  return (
    <main className="min-h-screen  p-6 md:p-24 selection:text-black selection:bg-slate-300">
      <ParticlesComponent id="particles" className=" absolute z-[-10]" />
      <Presentation />

      <Reveal>
        <hr id="about" />
        <About />
      </Reveal>
      <Reveal>
        <hr />
        <Skills />
      </Reveal>
      <Reveal>
        <hr />
        <Education />
      </Reveal>
      <Reveal>
        <hr />
        <Projects />
      </Reveal>
    </main>
  );
}
