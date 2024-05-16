import React from "react";

function Education() {
  return (
    <div
      id="education"
      className="flex flex-col items-center justify-center my-12 gap-6  ">
      <h1 className="text-center">Education</h1>
      <p className=" text-center w-full md:w-1/2">
        I&apos;m currently studying Software Engineering at Universidad
        Latinoamericana de Ciencia y Tecnología [ULACIT]
      </p>
      <div className="flex flex-col shadow-sm shadow-zinc-400 p-3 rounded-md hover:rounded-sm w-full  bg-gradient-to-tl from-black  bg-zinc-900 hover:bg-zinc-800 transition-all duration-500">
        <h2>Universidad Latinoamericana de Ciencia y Tecnología</h2>
        <h3>Costa Rica, San José, Barrio Tournon</h3>
        <p className=" text-justify">
          I&apos;m currently pursuing my Bachelors degree in Software
          Engineering at Universidad Latinoamericana de Ciencia y Tecnología
          [ULACIT]. It is a four-year program that covers several aspects of
          Software Engineering and its applications.
        </p>
      </div>
    </div>
  );
}

export default Education;
