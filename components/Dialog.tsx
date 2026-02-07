"use client";

import * as React from "react";
import {
  Dialog as DialogPrimitive,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  showCloseButton?: boolean;
  showFooterCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  hideDialog?: boolean;
  size?:
    | "sm"
    | "default"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
}

function Dialog({
  isOpen,
  setIsOpen,
  children,
  trigger,
  title,
  description,
  showCloseButton = true,
  showFooterCloseButton = false,
  footer,
  className,
  contentClassName,
  hideDialog = false,
  size,
}: CustomDialogProps) {
  return (
    <DialogPrimitive open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!hideDialog && (
        <DialogContent
          showCloseButton={showCloseButton}
          className={contentClassName}
          size={size}
        >
          <DialogHeader className={className}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto min-h-0 px-1 -mx-1 py-1 -my-1">
            {children}
          </div>
          {(footer || showFooterCloseButton) && (
            <DialogFooter showCloseButton={showFooterCloseButton}>
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      )}
    </DialogPrimitive>
  );
}

export default Dialog;
