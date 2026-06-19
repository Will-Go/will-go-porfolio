"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePanelHeadAnchorStore } from "@/stores/usePanelHeadAnchorStore";

interface IPanelHeadAnchorProps {
  zone: string;
  children: React.ReactNode;
}

/**
 * Wraps panel content and registers a top-center anchor for FloatingHeadOverlay.
 * Use on any panel zone listed in panelHeadPlacement.ts.
 */
export function PanelHeadAnchor({ zone, children }: IPanelHeadAnchorProps) {
  const registerAnchor = usePanelHeadAnchorStore((s) => s.registerAnchor);
  const markerRef = useRef<HTMLDivElement>(null);

  const setMarkerRef = useCallback(
    (node: HTMLDivElement | null) => {
      markerRef.current = node;
      registerAnchor(zone, node);
    },
    [zone, registerAnchor],
  );

  useEffect(() => {
    return () => registerAnchor(zone, null);
  }, [zone, registerAnchor]);

  return (
    <div className="relative">
      <div
        ref={setMarkerRef}
        className="pointer-events-none absolute top-0 left-1/2 h-0 w-px -translate-x-1/2"
        aria-hidden
      />
      {children}
    </div>
  );
}
