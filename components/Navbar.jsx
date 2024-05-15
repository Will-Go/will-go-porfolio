"use client";
import React from "react";
import Link from "next/link";
import { animate, motion } from "framer-motion";

function Navbar() {
  const links = [
    { text: "Home", href: "/" },
    { text: "About", href: "#about" },
    { text: "Projects", href: "#projects" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="flex sticky top-0 justify-between p-4 m-3 backdrop-blur-sm bg-opacity-80  bg-gradient-to-tr from-zinc-950  bg-zinc-900 rounded-lg drop-shadow-lg shadow-zinc-600">
      <p className=" font-bold">Wilson Gong Wu</p>
      <div className="flex items-center gap-5">
        {links.map(({ text, href }, i) => (
          <Link
            key={i}
            href={href}
            className="hover:-translate-y-0.5 transition-all duration-200">
            {text}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

export default Navbar;
