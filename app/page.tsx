//COMPONENTS
import Image from "next/image";
import BackgroundBlur from "@/components/BackgroundBlur";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      {/* <Presentation /> */}
      <div className="flex flex-col justify-center items-center h-[70vh] md:flex-row gap-6  w-full">
        <div className="grid  gap-4 place-content-center text-center md:text-left w-1/2">
          <div>
            <span className="text-2xl lg:text-4xl font-bold animate-fade-in with-cursor">
              Hi, I&apos;m Wilson.
            </span>
          </div>
          <div className="text-lg ">
            <p>
              I&apos;m a software engineer based in <strong>Costa Rica</strong>.
              I specialize in building web applications.
            </p>
          </div>
        </div>
        <div className="relative flex place-items-center ">
          {/* Background blur */}
          <BackgroundBlur className="h-96 w-96" />
          <Image
            src="/Wilson.png"
            alt="A picture of Wilson"
            width={200}
            height={200}
            className="rounded-full max-w-[200px] max-h-[200px] object-cover relative "
          />
        </div>
      </div>

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
        <hr id="experience" />
        <Experience />
      </Reveal>
      <Reveal>
        <hr id="projects" />
        <Projects />
      </Reveal>
    </main>
  );
}
