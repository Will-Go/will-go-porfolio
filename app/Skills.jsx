"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Skills() {
  const controls = useAnimation();
  const refSkills = useRef(null);
  const isInViewSkills = useInView(refSkills, { once: true });

  const techSkills = [
    "React.js",
    "Next.js",
    "Firebase",
    "Tailwind CSS",

    "MongoDB",
    "git",
    "Bootstrap",
    "jQuery",
    "AWS",
    "Azure",
    "Command line tools",
    "Python",
    "JavaScript",
    "Java",
    "C#",
    "Bash scripting",
    "SQL",
    "HTML",
    "CSS",
    "PHP",
  ];

  useEffect(() => {
    if (isInViewSkills) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [isInViewSkills]);

  return (
    <div
      id="skills"
      className="flex flex-col items-center justify-center my-12 gap-6  ">
      <h1 className="text-center">Skills</h1>
      <ol
        ref={refSkills}
        className="grid grid-cols-2 md:flex md:flex-wrap gap-6 justify-evenly text-center relative  place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent   after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] ">
        {techSkills.map((techSkill, i) => (
          <motion.li
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.25 * i }}
            className="border rounded-md cursor-default z-50 p-3 bg-gradient-to-tl from-black  bg-zinc-900 hover:bg-zinc-700 transition-all duration-500">
            {techSkill}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default Skills;
