"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import { MAX_UUID_COUNT, MIN_UUID_COUNT } from "@/lib/uuid";

export interface CountControlProps {
  value: string;
  onChange: (value: string) => void;
  onStep: (delta: number) => void;
  onPreset: (count: number) => void;
  onGenerate: () => void;
  disabled?: boolean;
  error?: string;
  labels: {
    label: string;
    helper: string;
    decrease: string;
    increase: string;
  };
}

const PRESETS = [1, 10, 50, 100];

export default function CountControl({
  value,
  onChange,
  onStep,
  onPreset,
  onGenerate,
  disabled = false,
  error,
  labels,
}: CountControlProps) {
  const numericValue = Number.parseInt(value, 10);

  return (
    <div className="space-y-3">
      <label
        htmlFor="uuid-count"
        className="block text-sm font-semibold tracking-[0.14em] uppercase text-gray-500 dark:text-primary-400"
      >
        {labels.label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={labels.decrease}
          disabled={disabled || numericValue <= MIN_UUID_COUNT}
          onClick={() => onStep(-1)}
          className={cn(
            "size-11 rounded-xl border border-gray-200 dark:border-primary-700",
            "flex items-center justify-center cursor-pointer touch-manipulation",
            "transition-[transform,background-color] duration-150 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "bg-gray-50 dark:bg-primary-900 text-gray-800 dark:text-primary-100",
          )}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <input
          id="uuid-count"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onGenerate();
            }
          }}
          aria-invalid={Boolean(error)}
          aria-describedby="uuid-count-helper"
          className={cn(
            "w-full min-h-11 px-4 text-center text-base font-mono rounded-xl",
            "bg-gray-50 dark:bg-primary-950/50 border text-gray-900 dark:text-primary-100",
            "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 dark:border-primary-700",
          )}
        />
        <button
          type="button"
          aria-label={labels.increase}
          disabled={disabled || numericValue >= MAX_UUID_COUNT}
          onClick={() => onStep(1)}
          className={cn(
            "size-11 rounded-xl border border-gray-200 dark:border-primary-700",
            "flex items-center justify-center cursor-pointer touch-manipulation",
            "transition-[transform,background-color] duration-150 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "bg-gray-50 dark:bg-primary-900 text-gray-800 dark:text-primary-100",
          )}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p
        id="uuid-count-helper"
        className="text-sm text-gray-500 dark:text-primary-500"
      >
        {labels.helper}
      </p>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const active = numericValue === preset;
          return (
            <button
              key={preset}
              type="button"
              disabled={disabled}
              onClick={() => onPreset(preset)}
              className={cn(
                "min-h-11 px-3 rounded-xl text-sm font-medium cursor-pointer touch-manipulation border",
                "transition-[transform,background-color,color] duration-150 active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                active
                  ? "bg-accent-500 text-white border-accent-500"
                  : "bg-gray-100 dark:bg-primary-900 text-gray-700 dark:text-primary-300 border-gray-200 dark:border-primary-800",
              )}
            >
              {preset}
            </button>
          );
        })}
      </div>
    </div>
  );
}
