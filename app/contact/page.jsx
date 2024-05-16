"use client";

import { motion } from "framer-motion";
import Image from "next/image";

//COMPONENTS
import Reveal from "@/components/Reveal";

//ICONS
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin, FaPhone } from "react-icons/fa";

function page() {
  const contacts = [
    { icon: <BiLogoGmail />, text: "wilsongongwu1@gmail.com" },
    { icon: <FaLinkedin />, text: "linkedin.com/in/wilsongw60/" },
    { icon: <FaPhone />, text: "+506 8735-7137" },
  ];

  return (
    <main className=" min-h-screen  p-6 md:p-24 selection:text-black selection:bg-slate-300">
      <Reveal>
        <div className="flex flex-col  justify-center items-center mt-20 ">
          <h1>Contact Me</h1>
          <div className="flex justify-between items-center gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
              <Image
                src="/FotoWilson.jpg"
                alt="A picture of Wilson"
                width={200}
                height={200}
                className="rounded-full max-w-[200px] max-h-[200px] object-cover relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]  "
              />
            </motion.div>

            <div className="flex flex-col group gap-2 shadow-sm shadow-zinc-400  rounded-md hover:rounded-sm cursor-default  p-3 bg-gradient-to-tl from-black  bg-zinc-900 hover:bg-zinc-800 transition-all duration-500">
              <ol className="grid gap-8">
                {contacts.map(({ icon, text }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.25 * i }}
                    className="flex items-center gap-2">
                    <div className="text-2xl">{icon}</div>
                    <div>{text}</div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}

export default page;
