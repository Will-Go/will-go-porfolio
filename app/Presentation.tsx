"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Typed from "typed.js";
import BackgroundBlur from "@/components/BackgroundBlur";
import { unstable_ViewTransition as ViewTransition } from "react";

function Presentarion() {
  const presentation = useRef(null);
  useEffect(() => {
    const typedPreseantation = new Typed(presentation.current, {
      strings: ["Hello, I&apos;m Wilson."],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typedPreseantation.destroy();
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] md:flex-row gap-6 overflow-visible  ">
      <div className="grid  gap-4 place-content-center text-center md:text-left w-1/2">
        <div>
          <span
            className="text-4xl font-bold animate-fade-in"
            ref={presentation}
          >
            Hello, I&apos;m Wilson.
          </span>
        </div>
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 2 }}
          className="text-lg "
        >
          <p>
            I&apos;m a software engineer based in <strong>Costa Rica</strong>. I
            specialize in building web applications.
          </p>
        </motion.div>
      </div>
      <div className="relative flex place-items-center ">
        {/* Background blur */}
        <BackgroundBlur className="h-96 w-96" />
        <ViewTransition name="wilson-image">
          <Image
            src="/meEdited.png"
            alt="A picture of Wilson"
            width={200}
            height={200}
            className="rounded-full max-w-[200px] max-h-[200px] object-cover relative "
          />
        </ViewTransition>
      </div>
    </div>
  );
}

export default Presentarion;
