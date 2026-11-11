"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import type { UuidNamespacePreset } from "@/lib/uuid";

export interface NameBasedFieldsProps {
  namespacePreset: UuidNamespacePreset;
  onNamespacePresetChange: (value: UuidNamespacePreset) => void;
  customNamespace: string;
  onCustomNamespaceChange: (value: string) => void;
  name: string;
  onNameChange: (value: string) => void;
  customError: string;
  labels: {
    title: string;
    helper: string;
    namespace: string;
    dns: string;
    url: string;
    oid: string;
    x500: string;
    custom: string;
    customLabel: string;
    customPlaceholder: string;
    name: string;
    namePlaceholder: string;
    nameHelper: string;
  };
}

const FIELD_CLASS = cn(
  "w-full min-h-11 px-4 py-3 bg-gray-50 dark:bg-primary-950/50 border rounded-xl text-base",
  "text-gray-900 dark:text-primary-100 placeholder-gray-400 dark:placeholder-primary-500",
  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
  "border-gray-200 dark:border-primary-700 transition-[box-shadow,border-color] duration-150",
);

export default function NameBasedFields({
  namespacePreset,
  onNamespacePresetChange,
  customNamespace,
  onCustomNamespaceChange,
  name,
  onNameChange,
  customError,
  labels,
}: NameBasedFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-gray-500 dark:text-primary-400">
          {labels.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-primary-400">
          {labels.helper}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="uuid-namespace"
            className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
          >
            {labels.namespace}
          </label>
          <Select
            value={namespacePreset}
            onValueChange={(value) =>
              onNamespacePresetChange(value as UuidNamespacePreset)
            }
          >
            <SelectTrigger id="uuid-namespace" className="min-h-11 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dns">{labels.dns}</SelectItem>
              <SelectItem value="url">{labels.url}</SelectItem>
              <SelectItem value="oid">{labels.oid}</SelectItem>
              <SelectItem value="x500">{labels.x500}</SelectItem>
              <SelectItem value="custom">{labels.custom}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="uuid-name"
            className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
          >
            {labels.name}
          </label>
          <input
            id="uuid-name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder={labels.namePlaceholder}
            autoComplete="off"
            spellCheck={false}
            className={FIELD_CLASS}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-primary-500">
            {labels.nameHelper}
          </p>
        </div>
      </div>

      {namespacePreset === "custom" && (
        <div>
          <label
            htmlFor="uuid-custom-namespace"
            className="block text-sm font-medium text-gray-700 dark:text-primary-300 mb-2"
          >
            {labels.customLabel}
          </label>
          <input
            id="uuid-custom-namespace"
            value={customNamespace}
            onChange={(event) => onCustomNamespaceChange(event.target.value)}
            placeholder={labels.customPlaceholder}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(customError)}
            className={cn(
              FIELD_CLASS,
              "font-mono",
              customError && "border-red-500 focus:ring-red-500",
            )}
          />
          {customError && (
            <p role="alert" className="mt-2 text-sm text-red-500">
              {customError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
