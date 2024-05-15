"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Typed from "typed.js";

function Presentarion() {
  const presentation = useRef(null);
  useEffect(() => {
    // const typed = new Typed(description.current, {
    //   strings: [
    //     "I&apos;m a software engineer based in <strong>Costa Rica</strong>. I specialize in building web applications.",
    //   ],
    //   typeSpeed: 50,
    // });
    const typedPreseantation = new Typed(presentation.current, {
      strings: ["Hello, I&apos;m Wilson."],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typedPreseantation.destroy();
      // typed.destroy();
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] md:flex-row gap-6  ">
      <div className="grid  gap-4 place-content-center text-center md:text-left w-1/2">
        <div>
          <span className="text-4xl font-bold  " ref={presentation}>
            Hello, I&apos;m Wilson.
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-lg  ">
          <p>
            I&apos;m a software engineer based in <strong>Costa Rica</strong>. I
            specialize in building web applications.
          </p>
        </motion.div>
      </div>
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
    </div>
  );
}

export default Presentarion;
