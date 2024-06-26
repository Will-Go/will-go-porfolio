"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Typed from "typed.js";

//COmponents
import MouseSpotlight from "./MouseSpotlight";

//ICONS
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const titulo = useRef(null);
  const navRef = useRef(null);
  const links = [
    { text: "Home", href: "/" },
    { text: "About", href: "/#about" },
    { text: "Projects", href: "/#projects" },
    { text: "Contact", href: "/contact" },
  ];
  useEffect(() => {
    const typed = new Typed(titulo.current, {
      strings: [
        "Wilson Gong Wu",
        "Software Engineer",
        "Web Developer",
        "Cibersecurity Enthusiast",
        "AI Enthusiast",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  // const handleWindowResize = () => setIsOpen(true);

  // useEffect(() => {
  //   window.addEventListener("scroll", function () {
  //     setIsOpen(false);
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", () => handleWindowResize);
  //   };
  // }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className={`flex flex-col sticky z-20  top-0 p-4 m-3 backdrop-blur-md bg-opacity-30 rounded-3xl  bg-gradient-to-tr from-slate-950  bg-slate-700 transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <Link className=" min-w-6" onClick={() => setIsOpen(false)} href={"/"}>
          <span ref={titulo} className=" font-bold">
            Wilson Gong Wu
          </span>
        </Link>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className=" text-white flex items-center p-4 md:hidden relative">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" absolute">
                {" "}
                <RxCross2 />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" absolute">
                {" "}
                <FaBars />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="items-center gap-5 hidden md:flex text-sm ">
          {links.map(({ text, href }, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setIsOpen(false)}
              className="hover:-translate-y-0.5 transition-all duration-200">
              {text}
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 items-center mt-6 text-sm  ">
            {links.map(({ text, href }, i) => (
              <Link
                key={i}
                href={href}
                onClick={() => setIsOpen(false)}
                className="hover:-translate-y-0.5 transition-all duration-200">
                {text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
