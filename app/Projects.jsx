"use client";
import Image from "next/image";
import { motion } from "framer-motion";

function Projects() {
  const projects = [
    {
      name: "D'woof",
      description:
        "In my current position, I work as a fullstack web developer for a startup. My main responsibility involves contributing to the development of a comprehensive social media web application. Our goal is to connect dog enthusiasts through a dedicated platform. This platform allows users to review various businesses that offer services related to dogs and their owners. We also have plans to launch a mobile app in the near future to expand our reach and accessibility.",
      technologies: ["Next.js", "React.js", "Firebase", "TailwindCSS"],
      image: "/dwoof.png",
    },
  ];

  return (
    <div
      id="projects"
      className="flex flex-col items-center justify-center my-12 gap-6  ">
      <h1 className="text-center">Projects</h1>
      <ol className="flex flex-col gap-3">
        {projects.map(({ name, description, technologies, image }, i) => (
          <motion.li
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 * i }}
            className="flex flex-col group gap-2 shadow-sm shadow-zinc-400  rounded-xl hover:rounded-sm cursor-default  p-3 bg-gradient-to-tl from-black  bg-zinc-900 hover:bg-zinc-800 transition-all duration-300">
            <h2>{name}</h2>
            <p className=" text-justify">{description}</p>
            <h3>Tecnologies:</h3>
            <div className="flex flex-wrap gap-3 ">
              {technologies.map((technology, i) => (
                <div
                  key={i}
                  className="rounded-full shadow-sm hover:-translate-y-1 shadow-zinc-400  p-2 text-xs transition-all duration-500">
                  {technology}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Image
                className=" h-[120px] w-[120px] rounded-xl group-hover:rounded-sm transition-all duration-300"
                src={image}
                width={200}
                height={200}
              />
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default Projects;
