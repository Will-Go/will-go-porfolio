"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export interface CopyActionProps {
  text: string;
  label: string;
  copiedLabel: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
}

export default function CopyAction({
  text,
  label,
  copiedLabel,
  variant = "outline",
  className,
  disabled = false,
}: CopyActionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    if (!text || disabled) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can fail in insecure contexts; keep the button usable.
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled || !text}
      onClick={handleCopy}
      className={cn(
        "h-11 min-w-11 rounded-xl px-4 cursor-pointer touch-manipulation",
        "transition-[transform,background-color,color,border-color] duration-150",
        "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
        variant === "primary" &&
          "bg-accent-500 hover:bg-accent-600 text-white border-transparent",
        variant === "outline" &&
          "border border-gray-200 dark:border-primary-700 text-gray-800 dark:text-primary-100",
        variant === "ghost" &&
          "border-transparent text-gray-600 dark:text-primary-300 hover:bg-gray-100 dark:hover:bg-primary-800",
        copied && "text-emerald-600 dark:text-emerald-400",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span>{copied ? copiedLabel : label}</span>
    </Button>
  );
}
