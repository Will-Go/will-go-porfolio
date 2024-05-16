import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  const socials = [
    {
      icon: (
        <FaGithub className=" hover:opacity-70 transition-all duration-500" />
      ),
      link: "https://github.com/Will-Go",
    },
    {
      icon: (
        <FaLinkedin className="hover:text-[#0b66c2] transition-all duration-500 " />
      ),
      link: "https://www.linkedin.com/in/wilsongw60/",
    },
  ];
  const currenDate = new Date();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left  h-[25vh] rounded-t-md p-6 px-36 md:px-72 bg-gradient-to-tr from-black  bg-zinc-900">
      <div className="flex flex-col items-center md:items-start justify-center">
        <h2>by Wilson</h2>
        <p>{currenDate.getFullYear()}</p>
      </div>
      <div className="flex flex-col justify-center items-center md:items-end  gap-4">
        <h2>Socials:</h2>
        <ol className="flex gap-4">
          {socials.map(({ icon, link }, i) => (
            <li key={i}>
              <Link href={link}>{icon}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Footer;
