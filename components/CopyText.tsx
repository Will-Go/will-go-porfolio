"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { IoCopy, IoCheckmark } from "react-icons/io5";
import { cn } from "@/utils/cn";

interface CopyTextProps {
  text: string;
  tooltipText?: string;
  className?: string;
}

export default function CopyText({
  text,
  tooltipText = "Copy to clipboard",
  className,
}: CopyTextProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch {}
  };

  return (
    <Tooltip content={isCopied ? "Copied!" : tooltipText}>
      <Button
        size="icon"
        variant="outline"
        onClick={handleCopy}
        className={cn(
          "transition-colors duration-200 !p-1",
          isCopied
            ? "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500"
            : "text-gray-500 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400",
          className,
        )}
      >
        {isCopied ? (
          <IoCheckmark className="h-2 w-2" />
        ) : (
          <IoCopy className="h-2 w-2" />
        )}
      </Button>
    </Tooltip>
  );
}
