import About from "@/components/About";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import FadeInOut from "@/components/FadeInOut";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Presentation from "@/components/Presentation";
import ChatBubble from "@/components/ChatBubble";

export default function HomePageServer() {
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
    </>
  );
}
