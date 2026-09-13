"use client";

import type { IQrShapePreset } from "@/lib/qr/styling";

export interface ShapeThumbProps {
  preset: IQrShapePreset;
  color: string;
}

export default function ShapeThumb({ preset, color }: ShapeThumbProps) {
  const radius =
    preset.dots === "square"
      ? 0
      : preset.dots === "dots"
        ? 99
        : preset.dots === "extra-rounded"
          ? 4
          : 2;

  return (
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <rect
        x="2"
        y="2"
        width="10"
        height="10"
        rx={radius === 99 ? 5 : 1}
        fill={color}
      />
      <rect
        x="24"
        y="2"
        width="10"
        height="10"
        rx={radius === 99 ? 5 : 1}
        fill={color}
      />
      <rect
        x="2"
        y="24"
        width="10"
        height="10"
        rx={radius === 99 ? 5 : 1}
        fill={color}
      />
      {[
        [16, 4],
        [16, 16],
        [4, 16],
        [28, 16],
        [16, 28],
        [28, 28],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="4"
          height="4"
          rx={Math.min(radius, 2)}
          fill={color}
        />
      ))}
    </svg>
  );
}
