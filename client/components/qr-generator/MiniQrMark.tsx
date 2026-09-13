"use client";

import { cn } from "@/utils/cn";

export interface MiniQrMarkProps {
  className?: string;
}

export default function MiniQrMark({ className }: MiniQrMarkProps) {
  return (
    <svg
      viewBox="0 0 21 21"
      className={cn("w-7 h-7 text-slate-800", className)}
    >
      <rect width="21" height="21" fill="white" />
      {[
        [1, 1],
        [13, 1],
        [1, 13],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="currentColor" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
        </g>
      ))}
      <rect x="10" y="10" width="2" height="2" fill="currentColor" />
      <rect x="13" y="10" width="2" height="2" fill="currentColor" />
      <rect x="16" y="13" width="2" height="2" fill="currentColor" />
      <rect x="10" y="16" width="2" height="2" fill="currentColor" />
      <rect x="18" y="18" width="2" height="2" fill="currentColor" />
    </svg>
  );
}
