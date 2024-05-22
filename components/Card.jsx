"use client";
import { useEffect, useRef } from "react";

//COMPONENTS
import MouseSpotlight from "./MouseSpotlight";

function Card({ children }) {
  const divRef = useRef(null);

  return (
    <div
      ref={divRef}
      className=" cursor-default group relative overflow-hidden flex flex-col border-2 border-white/10 p-3 rounded-md hover:rounded-sm w-full  bg-gradient-to-tl from-black  bg-zinc-900  transition-all duration-500">
      <MouseSpotlight outterRef={divRef}>{children}</MouseSpotlight>
    </div>
  );
}

export default Card;
