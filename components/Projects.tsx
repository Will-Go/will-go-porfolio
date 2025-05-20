import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

//COMPONENTS
import ProjectCard from "@/components/ProjectCard";

//INTERFACE
import Project, { IncomingProject } from "@/interfaces/IProject";

export default function WrappedProjects() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    <div className="flex flex-col items-center justify-center my-12 gap-6 px-8 ">
      <h1 className="text-center">Projects</h1>
      {projects.length === 0 && <p>No projects found</p>}
      {projectFetchError && (
        <p className="text-red-700 font-bold text-xs italic bg-red-400/10 p-2 rounded-md">
          {projectFetchError}
        </p>
      )}
      <Carousel className="w-full">
        <CarouselContent>
          {projects.map((project, i) => (
            <CarouselItem className=" md:basis-1/2 lg:basis-1/3 " key={i}>
              <ProjectCard
                index={i}
                {...project}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.25 * i }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
