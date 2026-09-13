"use client";

import type { ReactNode } from "react";
import type { QrFrameId } from "@/lib/qr/frames";

export interface FrameShellProps {
  frame: QrFrameId;
  caption: string;
  children: ReactNode;
}

export default function FrameShell({
  frame,
  caption,
  children,
}: FrameShellProps) {
  const captionEl = (
    <p
      data-testid="qr-frame-caption"
      className="text-center text-[11px] font-bold tracking-[0.22em] text-black"
    >
      {caption}
    </p>
  );

  if (frame === "none") {
    return (
      <div data-testid="qr-frame-shell" data-frame={frame}>
        {children}
      </div>
    );
  }
  if (frame === "square") {
    return (
      <div className="bg-white p-2.5 border-[3px] border-slate-800 dark:border-primary-200">
        {children}
      </div>
    );
  }
  if (frame === "rounded") {
    return (
      <div className="bg-white p-2.5 border-[3px] border-slate-800 dark:border-primary-200 rounded-2xl">
        {children}
      </div>
    );
  }
  if (frame === "dashed") {
    return (
      <div className="bg-white p-2.5 border-[3px] border-dashed border-slate-800 dark:border-primary-200 rounded-xl">
        {children}
      </div>
    );
  }
  if (frame === "double") {
    return (
      <div className="bg-white p-1 border-2 border-slate-800 dark:border-primary-200">
        <div className="p-2 border-2 border-slate-800 dark:border-primary-200">
          {children}
        </div>
      </div>
    );
  }
  if (frame === "corners") {
    return (
      <div className="relative bg-white p-4">
        <span className="pointer-events-none absolute inset-1 border-slate-800 dark:border-primary-200 [border-width:3px_0_0_3px] w-6 h-6" />
        <span className="pointer-events-none absolute top-1 right-1 border-slate-800 dark:border-primary-200 [border-width:3px_3px_0_0] w-6 h-6" />
        <span className="pointer-events-none absolute bottom-1 left-1 border-slate-800 dark:border-primary-200 [border-width:0_0_3px_3px] w-6 h-6" />
        <span className="pointer-events-none absolute bottom-1 right-1 border-slate-800 dark:border-primary-200 [border-width:0_3px_3px_0] w-6 h-6" />
        {children}
      </div>
    );
  }
  if (frame === "scan-me") {
    return (
      <div className="bg-white p-2.5 border-[3px] border-slate-800 dark:border-primary-200 space-y-2">
        {children}
        {captionEl}
      </div>
    );
  }
  if (frame === "scan-me-top") {
    return (
      <div className="bg-white p-2.5 border-[3px] border-slate-800 dark:border-primary-200 space-y-2">
        {captionEl}
        {children}
      </div>
    );
  }
  if (frame === "balloon") {
    return (
      <div className="relative bg-white p-3 border-[3px] border-slate-800 dark:border-primary-200 rounded-3xl">
        {children}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 rotate-45 bg-white border-b-[3px] border-r-[3px] border-slate-800 dark:border-primary-200" />
      </div>
    );
  }
  if (frame === "polaroid") {
    return (
      <div className="bg-white p-3 pb-8 shadow-[0_8px_24px_rgba(15,23,42,0.12)] border border-gray-200">
        {children}
        <div className="mt-3">{captionEl}</div>
      </div>
    );
  }
  if (frame === "ticket") {
    return (
      <div className="relative bg-white p-3 border-[3px] border-slate-800 dark:border-primary-200 rounded-lg">
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-slate-100 dark:bg-primary-950" />
        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-slate-100 dark:bg-primary-950" />
        {children}
      </div>
    );
  }
  return (
    <div className="bg-white p-3 border-[3px] border-slate-800 dark:border-primary-200 rounded-[28px] space-y-2">
      {children}
      {captionEl}
    </div>
  );
}
