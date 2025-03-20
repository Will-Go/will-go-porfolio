//NOTE: This component is used to display text with a "see more" button if the text is too long
//NOTE: The text will be displayed with a maximum of 3 lines, if the text is longer than that, a "see more" button will be displayed
import React, { useRef, useState, useEffect } from "react";
//UTILS
import { cn } from "@/utils/cn";

interface TextDisplayerProps {
  text: string;
  className?: string;
}

export default function TextDisplayer({ text, className }: TextDisplayerProps) {
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
        className={cn(
          ` ${seeMore ? "overflow-auto" : "line-clamp-3"}`,
          className
        )}
      >
        {text}
      </p>
      {isOverflowed && (
        <button
          onClick={() => setSeeMore(!seeMore)}
          className="text-accent-300 text-xs cursor-pointer "
        >
          {seeMore ? "see less..." : "see more..."}
        </button>
      )}
    </>
  );
}
