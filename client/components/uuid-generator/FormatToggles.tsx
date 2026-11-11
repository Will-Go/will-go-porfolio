"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";
import {
  DEFAULT_UUID_FORMAT,
  isGuidStyle,
  type IUuidFormatOptions,
  type UuidBulkSeparator,
} from "@/lib/uuid";

export interface FormatTogglesProps {
  value: IUuidFormatOptions;
  onChange: (value: IUuidFormatOptions) => void;
  separator: UuidBulkSeparator;
  onSeparatorChange: (value: UuidBulkSeparator) => void;
  showSeparator: boolean;
  labels: {
    title: string;
    uppercase: string;
    hyphens: string;
    braces: string;
    urn: string;
    guidPreset: string;
    separator: string;
    newline: string;
    comma: string;
  };
}

interface IToggleItem {
  key: keyof IUuidFormatOptions;
  label: string;
}

export default function FormatToggles({
  value,
  onChange,
  separator,
  onSeparatorChange,
  showSeparator,
  labels,
}: FormatTogglesProps) {
  const toggles: IToggleItem[] = [
    { key: "uppercase", label: labels.uppercase },
    { key: "hyphens", label: labels.hyphens },
    { key: "braces", label: labels.braces },
    { key: "urn", label: labels.urn },
  ];
  const guidActive = isGuidStyle(value);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-[0.14em] uppercase text-gray-500 dark:text-primary-400">
          {labels.title}
        </p>
        <button
          type="button"
          aria-pressed={guidActive}
          onClick={() =>
            onChange(
              guidActive
                ? DEFAULT_UUID_FORMAT
                : {
                    uppercase: true,
                    hyphens: true,
                    braces: true,
                    urn: false,
                  },
            )
          }
          className={cn(
            "min-h-11 px-3 rounded-full text-xs font-semibold cursor-pointer touch-manipulation",
            "transition-[transform,background-color,color,border-color] duration-150",
            "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            guidActive
              ? "bg-accent-500 text-white border-accent-500"
              : "bg-gray-100 dark:bg-primary-900 text-gray-700 dark:text-primary-300 border-gray-200 dark:border-primary-800",
          )}
        >
          {labels.guidPreset}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {toggles.map((item) => (
          <label
            key={item.key}
            htmlFor={`uuid-format-${item.key}`}
            className="flex items-center justify-between gap-3 min-h-11 px-3 rounded-xl cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-primary-200">
              {item.label}
            </span>
            <Switch
              id={`uuid-format-${item.key}`}
              checked={value[item.key]}
              onCheckedChange={(checked) =>
                onChange({ ...value, [item.key]: checked })
              }
              className="data-[state=checked]:bg-accent-500"
            />
          </label>
        ))}
      </div>

      {showSeparator && (
        <fieldset className="pt-2">
          <legend className="text-sm font-medium text-gray-800 dark:text-primary-200 mb-2">
            {labels.separator}
          </legend>
          <div className="flex gap-2">
            {(
              [
                ["newline", labels.newline],
                ["comma", labels.comma],
              ] as const
            ).map(([id, optionLabel]) => {
              const active = separator === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSeparatorChange(id)}
                  className={cn(
                    "min-h-11 px-4 rounded-xl text-sm font-medium cursor-pointer touch-manipulation border",
                    "transition-[transform,background-color,color] duration-150 active:scale-[0.97]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                    active
                      ? "bg-white dark:bg-primary-800 border-accent-500 text-accent-600 dark:text-accent-400"
                      : "bg-gray-100 dark:bg-primary-900 border-gray-200 dark:border-primary-800 text-gray-700 dark:text-primary-300",
                  )}
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}
