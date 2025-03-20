"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import projects from "@/content/projects";

//COMPONENTS
import ProjectCard from "@/components/ProjectCard";

function Projects() {
  return (
    <div className="flex flex-col items-center justify-center my-12 gap-6 px-8 ">
      <h1 className="text-center">Projects</h1>

      <Carousel className="w-full">
        <CarouselContent>
          {projects.map((project, i) => (
            <CarouselItem className="md:basis-1 lg:basis-1/3" key={i}>
              <ProjectCard index={i} {...project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Projects;
