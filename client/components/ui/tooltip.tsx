"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

interface TooltipProps {
  children: React.ReactElement;
  content: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function Tooltip({
  children,
  content,
  className,
  side = "top",
  sideOffset = 4,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 -translate-y-1/2 ml-1",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900",
    right:
      "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none",
            sideClasses[side],
            className
          )}
          style={{ marginBottom: side === "top" ? sideOffset : undefined }}
        >
          {content}
          <div
            className={cn("absolute w-0 h-0 border-4", arrowClasses[side])}
          />
        </div>
      )}
    </div>
  );
}
