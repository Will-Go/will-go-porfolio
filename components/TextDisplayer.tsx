//NOTE: This component is used to display text with a "see more" button if the text is too long
//NOTE: The text will be displayed with a maximum of 3 lines, if the text is longer than that, a "see more" button will be displayed
import React, { useRef, useState, useEffect } from "react";

//UTILS
import { cn } from "../utils/cn";

interface TextDisplayerProps {
  text: string;
  className?: string;
  numClamp?: number;
}

export default function TextDisplayer({
  text,
  className,
  numClamp = 3,
}: TextDisplayerProps) {
  const typographyRef = useRef<HTMLParagraphElement | null>(null);

  const [seeMore, setSeeMore] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const element = typographyRef.current;
    if (element) {
      // Check if the content overflows
      const isOverflowing = element.scrollHeight > element.offsetHeight;
      setIsOverflowed(isOverflowing);
    }
  }, [text]);

  return (
    <>
      <p
        ref={typographyRef}
        className={cn("", className)}
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: seeMore ? "none" : numClamp,
        }}
      >
        {text}
      </p>
      {isOverflowed && (
        <button
          type="button"
          onClick={() => setSeeMore(!seeMore)}
          className="text-accent-500! cursor-pointer text-xs mt-1 bg-transparent border-none p-0"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
          }}
        >
          {seeMore ? "see less..." : "see more..."}
        </button>
      )}
    </>
  );
}
