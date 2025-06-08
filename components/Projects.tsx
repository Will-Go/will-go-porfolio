import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Reveal from "@/components/Reveal";

//COMPONENTS
import ProjectCard from "@/components/ProjectCard";

//ICONS
import { FaGithub, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

//INTERFACE
import Project, { IncomingProject } from "@/interfaces/IProject";

export default function WrappedProjects() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
          <div className="flex items-center gap-3">
            <FaSpinner className="text-2xl text-accent-500 animate-spin" />
            <span className="text-primary-300">Loading projects...</span>
          </div>
        </div>
      }
    >
      <Projects />
    </Suspense>
  );
}

async function Projects() {
  let projects: Project[] = [];
  let projectFetchError = "";
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=user%3AWill-Go%20topic%3Aporfolio&sort=updated&direction=desc"
    );

    if (!res.ok) {
      projectFetchError = "Failed to fetch projects";
    } else {
      const data = await res.json();

      projects = data.items.map((item: IncomingProject) => {
        let tech: string[] = [];
        let cat: string[] = [];

        item.topics.forEach((topic: string) => {
          if (topic.startsWith("c-")) {
            cat.push(topic.replace("c-", ""));
          } else if (topic.startsWith("t-")) {
            tech.push(topic.replace("t-", ""));
          }
        });

        return {
          name: item.name,
          description: item.description,
          categories: cat,
          technologies: tech,
          repoUrl: item.html_url,
          created_at: item.created_at,
        };
      });
    }
  } catch {
    projectFetchError = "Failed to fetch projects";
  }
  return (
    <div className="flex flex-col items-center justify-center my-16 gap-8 w-full">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGithub className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              Featured Projects
            </h1>
          </div>
          <p className="text-lg text-primary-300 leading-relaxed max-w-2xl mx-auto">
            Explore my latest work and contributions to the open-source
            community
          </p>
        </div>
      </Reveal>
      {projects.length > 0 && (
        <Reveal
          animationType="fadeUp"
          delay={0.8}
          duration={0.8}
          easing="easeOut"
        >
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 rounded-full border border-accent-500/30">
              <FaGithub className="text-accent-400" />{" "}
              <span className="text-primary-300 text-sm">
                {projects.length} project{projects.length !== 1 ? "s" : ""} from
                GitHub
              </span>
            </div>
          </div>
        </Reveal>
      )}
      <Reveal
        animationType="fadeUp"
        delay={0.3}
        duration={1}
        easing="easeOut"
        className=" w-full md:w-fit px-6 md:px-0"
      >
        {projects.length === 0 && !projectFetchError && (
          <div className="text-center py-12">
            <p className="text-primary-400 text-lg">No projects found</p>{" "}
            <p className="text-primary-500 text-sm mt-2">
              Projects will appear here once they&apos;re available
            </p>
          </div>
        )}
        {projectFetchError && (
          <div className="flex items-center justify-center gap-3 py-12">
            <FaExclamationTriangle className="text-red-400 text-xl" />
            <div className="text-center">
              <p className="text-red-400 font-semibold">
                Unable to load projects
              </p>
              <p className="text-red-300 text-sm mt-1">{projectFetchError}</p>
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <Carousel className="w-full max-w-xs  md:max-w-7xl">
            <CarouselContent>
              {projects.map((project, i) => (
                <CarouselItem
                  className=" basis-full sm:basis-1/4 lg:basis-1/3 "
                  key={i}
                >
                  <Reveal
                    animationType="flipUp"
                    delay={0.25 + i * 0.1}
                    duration={0.6}
                    easing="backOut"
                  >
                    <ProjectCard index={i} {...project} />
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary-900/80 border-primary-700/60 text-primary-200 hover:bg-accent-500/20 hover:border-accent-500/60 hover:text-accent-300 transition-all duration-300 shadow-lg backdrop-blur-sm" />
            <CarouselNext className="bg-primary-900/80 border-primary-700/60 text-primary-200 hover:bg-accent-500/20 hover:border-accent-500/60 hover:text-accent-300 transition-all duration-300 shadow-lg backdrop-blur-sm" />
          </Carousel>
        )}
      </Reveal>
    </div>
  );
}
