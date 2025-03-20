import Card from "./Card";
import Image from "next/image";
import Link from "next/link";
import { MotionProps } from "framer-motion";
import TextDisplayer from "./TextDisplayer";

import Experience from "@/interfaces/IExperience";
export interface ExperienceCardProps extends Experience, MotionProps {
  index: number;
}

export default function ExperienceCard({
  index,
  name,
  date,
  description,
  technologies,
  imageUrl,
  companyUrl,
  ...motionProps
}: Readonly<ExperienceCardProps>) {
  return (
    <Card
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 * index }}
      className="flex group items-center gap-6  rounded-xl  cursor-default  p-3  transition-all duration-300"
      {...motionProps}
    >
      <div className="flex flex-col gap-2 w-auto">
        <div className="flex items-center gap-2">
          <h2>{name}</h2> <span className="text-xs">{date}</span>
        </div>
        <div className=" text-justify">
          <TextDisplayer text={description} />
        </div>
        <h3>Tecnologies:</h3>
        <div className="flex flex-wrap gap-3 ">
          {technologies.map((technology, i) => (
            <div
              key={i}
              className="rounded-full border-2 border-primary-800 bg-primary-950  hover:-translate-y-1   p-2 text-xs transition-all duration-500"
            >
              {technology}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 w-fit">
        {companyUrl ? (
          <Link
            href={companyUrl}
            target="_blank"
            className="relative group/company transition-all duration-300"
          >
            <span className="text-xs absolute inset-0 flex items-center justify-center group-hover/company:opacity-100 opacity-0 transition-all duration-300">
              go to the website
            </span>
            <Image
              alt="Project image"
              className="group-hover/company:opacity-30 min-h-[120px] min-w-[120px] rounded-xl group-hover:rounded-xs transition-all duration-300"
              src={imageUrl}
              width={200}
              height={200}
            />
          </Link>
        ) : (
          <Image
            alt="Project image"
            className="min-h-[120px] min-w-[120px] rounded-xl group-hover:rounded-xs transition-all duration-300"
            src={imageUrl}
            width={200}
            height={200}
          />
        )}
      </div>
    </Card>
  );
}
