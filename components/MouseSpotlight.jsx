"use client";
import { useEffect, useRef } from "react";

function MouseSpotlight({ children, outterRef }) {
  const spanRef = useRef(null);

  useEffect(() => {
    const span = spanRef.current;
    const handleMouseMove = (e) => {
      //   console.log(e);
      const { width } = e.target.getBoundingClientRect();
      const { height } = e.target.getBoundingClientRect();
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      //   console.log(width, height, offsetX, offsetY);
      span.animate(
        {
          left: `${(offsetX / width) * 100}%`,
          top: `${(offsetY / height) * 100}%`,
        },
        {
          duration: 250,
          fill: "forwards",
        }
      );
    };

    outterRef.current.addEventListener("mousemove", handleMouseMove);
    // IT THROWS AN ERROR (TypeError: Cannot read properties of null (reading 'removeEventListener'))
    // return () => {
    //   outterRef.current.removeEventListener("mousemove", handleMouseMove);
    // };
  }, []);
  return (
    <>
      <span className=" pointer-events-none z-10">{children}</span>
      <span
        ref={spanRef}
        className={` pointer-events-none h-28 w-28 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#0141ff] border-8 border-white absolute  opacity-0 group-hover:opacity-30  transition-all duration-300 blur-2xl `}
      />
    </>
  );
}

export default MouseSpotlight;
