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
    "Windows",
    "Linux",
    "Python",
    "JavaScript",
    "Java",
    "C#",
    "Bash scripting",
    "SQL",
    "NoSQL",
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
      className="flex flex-col items-center justify-center my-8 gap-6 ">
      <h1 className="text-center">Skills</h1>
      <ol
        ref={refSkills}
        className="grid grid-cols-2 md:flex md:flex-wrap gap-4 justify-evenly  text-center relative   before:absolute before:h-[300px] before:w-[100px] sm:before:w-[100px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-50 after:h-[180px] after:w-[200px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent   after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] ">
        {techSkills.map((techSkill, i) => (
          <motion.li
            key={i}
            initial={{ y: 15, opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.15 * i }}
            className="flex justify-center items-center border rounded-xl cursor-default p-3  bg-gradient-to-tl from-black  bg-zinc-900 hover:bg-zinc-700 transition-all duration-500">
            {techSkill}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default Skills;
