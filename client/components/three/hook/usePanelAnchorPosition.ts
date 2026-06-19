"use client";

import { useEffect, useState } from "react";
import { usePanelHeadAnchorStore } from "@/stores/usePanelHeadAnchorStore";

export interface IAnchorPosition {
  left: number;
  top: number;
}

export function usePanelAnchorPosition(
  zone: string | null,
): IAnchorPosition | null {
  const anchor = usePanelHeadAnchorStore((s) =>
    zone ? (s.anchors[zone] ?? null) : null,
  );
  const [position, setPosition] = useState<IAnchorPosition | null>(null);

  useEffect(() => {
    if (!anchor) {
      setPosition(null);
      return;
    }

    const update = () => {
      const rect = anchor.getBoundingClientRect();
      setPosition({
        left: rect.left + rect.width / 2,
        top: rect.top,
      });
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(anchor);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchor]);

  return position;
}
