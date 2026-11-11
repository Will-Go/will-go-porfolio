"use client";

import { useRef } from "react";
import { UUID_VERSIONS, type UuidVersionId } from "@/lib/uuid";
import { cn } from "@/utils/cn";

export interface VersionPillsProps {
  value: UuidVersionId;
  onChange: (value: UuidVersionId) => void;
  label: string;
  getName: (id: UuidVersionId) => string;
}

export default function VersionPills({
  value,
  onChange,
  label,
  getName,
}: VersionPillsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusAt(index: number): void {
    const next = (index + UUID_VERSIONS.length) % UUID_VERSIONS.length;
    onChange(UUID_VERSIONS[next].id);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:snap-none"
    >
      {UUID_VERSIONS.map((item, index) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            data-testid={`uuid-version-${item.id}`}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                focusAt(index + 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                focusAt(index - 1);
              }
            }}
            className={cn(
              "snap-start shrink-0 min-h-11 px-4 rounded-full text-sm font-semibold",
              "cursor-pointer touch-manipulation border",
              "transition-[transform,background-color,color,border-color] duration-150",
              "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
              active
                ? "bg-accent-500 text-white border-accent-500 shadow-sm"
                : "bg-gray-100 dark:bg-primary-900 text-gray-700 dark:text-primary-300 border-gray-200 dark:border-primary-800 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-gray-200 dark:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary-800",
            )}
          >
            {getName(item.id)}
          </button>
        );
      })}
    </div>
  );
}
