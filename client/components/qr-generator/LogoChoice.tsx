"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface LogoChoiceProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  testId: string;
  children: ReactNode;
}

export default function LogoChoice({
  selected,
  onClick,
  label,
  testId,
  children,
}: LogoChoiceProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "size-16 rounded-xl border-2 flex items-center justify-center bg-gray-50 dark:bg-primary-950/40",
        selected
          ? "border-accent-500"
          : "border-gray-200 dark:border-primary-700 hover:border-accent-300",
      )}
    >
      {children}
    </button>
  );
}
