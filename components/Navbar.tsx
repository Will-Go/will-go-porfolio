"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";

//UTILS
import { cn } from "@/utils/cn";

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
    { text: "Experience", href: "/#experience" },
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

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is restored
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className={cn(
        ` flex flex-col fixed left-6 right-6 lg:left-24 lg:right-24 py-4 px-6 lg:px-12 border border-primary-800/50  z-50 backdrop-blur-sm bg-accent-900/20 ease-in-out transition-all duration-300`,
        isOpen
          ? "top-0 m-0 rounded-none !border-none   left-0 right-0 bottom-0 "
          : "top-1 rounded-2xl m-3 "
      )}
    >
      <div className="flex justify-between items-center">
        <Link className=" min-w-6" onClick={() => setIsOpen(false)} href={"/"}>
          <span ref={titulo} className="font-bold">
            Wilson Gong Wu
          </span>
        </Link>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className=" text-white flex items-center p-4 md:hidden relative"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" absolute"
              >
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
                className=" absolute"
              >
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
              className="hover:-translate-y-0.5 transition-all duration-200"
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "100vh", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2 items-center mt-12 md:hidden"
          >
            {links.map(({ text, href }, i) => (
              <Link
                key={i}
                href={href}
                onClick={() => setIsOpen(false)}
                className="hover:-translate-y-0.5 transition-all duration-200 text-2xl"
              >
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
