"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import BackgroundBlur from "@/components/BackgroundBlur";
import techSkills from "@/content/techSkills";

function Skills() {
  const controls = useAnimation();
  const refSkills = useRef<HTMLOListElement | null>(null);
  const isInViewSkills = useInView(refSkills, { once: true });

  useEffect(() => {
    if (isInViewSkills) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [isInViewSkills]);

  return (
    <div
      id="skills"
      className="relative flex flex-col items-center justify-center my-8 gap-6 "
    >
      <BackgroundBlur className="h-96 w-96" />
      <h1 className="text-center">Skills</h1>
      <ol
        ref={refSkills}
        className="grid grid-cols-2 md:flex md:flex-wrap gap-4 justify-evenly  text-center  "
      >
        {techSkills.map((techSkill, i) => (
          <li
            key={i}
            className="fade-in-up flex justify-center items-center  border-2 border-primary-800 rounded-xl cursor-default p-3  bg-linear-to-tl hover:bg-accent-400/30 from-primary-950 via-primary-950 bg-primary-800 transition-all duration-500"
            style={{
              animationDelay: `${i * 0.25}s`,
            }}
          >
            {techSkill}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Skills;
