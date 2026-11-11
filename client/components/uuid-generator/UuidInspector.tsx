"use client";

import { cn } from "@/utils/cn";
import type { IUuidDecodeResult } from "@/lib/uuid";

export interface UuidInspectorProps {
  decoded: IUuidDecodeResult | null;
  pasteValue: string;
  onPasteChange: (value: string) => void;
  onPasteBlur: () => void;
  pasteError: string;
  labels: {
    title: string;
    version: string;
    variant: string;
    timestamp: string;
    clockSequence: string;
    node: string;
    canonical: string;
    pasteLabel: string;
    pastePlaceholder: string;
    empty: string;
    rfc: string;
    nil: string;
    max: string;
    variantRfc: string;
    variantNcs: string;
    variantMicrosoft: string;
    variantUnknown: string;
  };
}

function variantLabel(
  variant: IUuidDecodeResult["variant"],
  labels: UuidInspectorProps["labels"],
): string {
  if (variant === "rfc") return labels.variantRfc;
  if (variant === "ncs") return labels.variantNcs;
  if (variant === "microsoft") return labels.variantMicrosoft;
  return labels.variantUnknown;
}

export default function UuidInspector({
  decoded,
  pasteValue,
  onPasteChange,
  onPasteBlur,
  pasteError,
  labels,
}: UuidInspectorProps) {
  const rows =
    decoded && decoded.isValid
      ? [
          {
            label: labels.version,
            value: decoded.isNil
              ? labels.nil
              : decoded.isMax
                ? labels.max
                : decoded.version !== null
                  ? `v${decoded.version}`
                  : "—",
          },
          {
            label: labels.variant,
            value: variantLabel(decoded.variant, labels),
          },
          decoded.timestamp
            ? { label: labels.timestamp, value: decoded.timestamp }
            : null,
          decoded.clockSequence !== null
            ? {
                label: labels.clockSequence,
                value: String(decoded.clockSequence),
              }
            : null,
          decoded.node ? { label: labels.node, value: decoded.node } : null,
          { label: labels.canonical, value: decoded.canonical },
        ].filter((row): row is { label: string; value: string } => row !== null)
      : [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-gray-500 dark:text-primary-400">
          {labels.title}
        </h2>
        <span className="text-xs font-medium text-gray-500 dark:text-primary-500">
          {labels.rfc}
        </span>
      </div>

      <div>
        <label
          htmlFor="uuid-decode"
          className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
        >
          {labels.pasteLabel}
        </label>
        <input
          id="uuid-decode"
          value={pasteValue}
          onChange={(event) => onPasteChange(event.target.value)}
          onBlur={onPasteBlur}
          placeholder={labels.pastePlaceholder}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(pasteError)}
          className={cn(
            "w-full min-h-11 px-4 py-3 bg-gray-50 dark:bg-primary-950/50 border rounded-xl",
            "font-mono text-base text-gray-900 dark:text-primary-100",
            "placeholder-gray-400 dark:placeholder-primary-500",
            "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
            pasteError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 dark:border-primary-700",
          )}
        />
        {pasteError && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            {pasteError}
          </p>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-primary-500">
          {labels.empty}
        </p>
      ) : (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl bg-gray-50 dark:bg-primary-950/40 px-4 py-3"
            >
              <dt className="text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-primary-500">
                {row.label}
              </dt>
              <dd className="mt-1 font-mono text-sm break-all text-gray-900 dark:text-primary-100">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
