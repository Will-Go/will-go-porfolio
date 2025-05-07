"use client";
import Card from "./Card";
import { RiShareBoxLine } from "react-icons/ri";
import Link from "next/link";
import TextDisplayer from "./TextDisplayer";
import { MotionProps } from "framer-motion";
import { formatDate } from "@/utils/dateFormatter";
import Project from "@/interfaces/IProject";
import { firstLetterCap } from "@/utils/firstLetterCap";

export interface ProjectCardProps extends Project, MotionProps {
  index: number;
}

export default function ProjectCard({
  index,
  name,
  description,
  categories,
  technologies,
  repoUrl,
  created_at,
  ...motionProps
}: Readonly<ProjectCardProps>) {
  return (
    <Card
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 * index }}
      className="flex flex-col group items-start gap-3  rounded-xl  cursor-default  p-3  transition-all duration-300"
      {...motionProps}
    >
      <Link
        className="flex items-center gap-2 hover:underline hover:opacity-80 transition-all duration-300 ease-in-out"
        target="_blank"
        href={repoUrl}
      >
        <h2>{name}</h2>
        <RiShareBoxLine />
      </Link>
      {created_at && (
        <div className="text-xs italic text-muted-foreground mb-3">
          <span className="font-semibold">Created:</span>{" "}
          {formatDate(created_at)}
        </div>
      )}

      <div className="text-justify">
        <TextDisplayer text={description} />
      </div>
      {categories.length > 0 && (
        <>
          <h3>Categor{categories.length === 1 ? "y" : "ies"}:</h3>
          <div className="flex flex-wrap gap-3 ">
            {categories.map((category, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-primary-800 bg-primary-950  hover:-translate-y-1   p-2 text-xs transition-all duration-500"
              >
                {firstLetterCap(category)}
              </div>
            ))}
          </div>
        </>
      )}
      {technologies.length > 0 && (
        <>
          <h3>Tecnolog{technologies.length === 1 ? "y" : "ies"}:</h3>
          <div className="flex flex-wrap gap-3 ">
            {technologies.map((technology, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-primary-800 bg-primary-950  hover:-translate-y-1   p-2 text-xs transition-all duration-500"
              >
                {firstLetterCap(technology)}
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
