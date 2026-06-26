"use client";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import Snap from "lenis/snap";
import { usePanelStore } from "@/stores/usePanelStore";
import { useViewModeStore } from "@/stores/useViewModeStore";
import "lenis/dist/lenis.css";

interface LenisWrapperProps {
  children: React.ReactNode;
}

function LenisWrapper({ children }: LenisWrapperProps) {
  const lenisRef = useRef<LenisRef>(null);
  const snapRef = useRef<Snap | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const is3D = useViewModeStore((state) => state.is3D);
  const expandedPanel = usePanelStore((state) => state.expandedPanel);
  const shouldStopLenis = is3D || expandedPanel !== null;

  useEffect(() => {
    if (prefersReducedMotion) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const syncLenis = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return false;

      if (shouldStopLenis) {
        lenis.stop();
        snapRef.current?.stop();
      } else {
        lenis.start();
        snapRef.current?.start();
      }

      return true;
    };

    if (syncLenis()) return;

    const frameId = requestAnimationFrame(() => {
      syncLenis();
    });

    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, shouldStopLenis]);

  useEffect(() => {
    if (prefersReducedMotion || shouldStopLenis) return;

    let snapInstance: Snap | null = null;

    const setupSnap = () => {
      const lenis = lenisRef.current?.lenis;
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-snap-section]",
      );

      if (!lenis || sections.length === 0 || snapInstance) return false;

      snapInstance = new Snap(lenis, {
        type: "proximity",
        distanceThreshold: "25%",
        debounce: 150,
        lerp: 0.12,
        onSnapComplete: () => {
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(8);
          }
        },
      });

      snapInstance.addElements([...sections], { align: ["start", "start"] });
      snapInstance.start();
      snapRef.current = snapInstance;
      return true;
    };

    if (setupSnap()) {
      const onResize = () => snapRef.current?.resize();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        snapInstance?.stop();
        snapRef.current = null;
      };
    }

    const observer = new MutationObserver(() => {
      if (setupSnap()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      snapInstance?.stop();
      snapRef.current = null;
    };
  }, [prefersReducedMotion, shouldStopLenis]);

  useEffect(() => {
    return () => {
      snapRef.current?.stop();
      snapRef.current = null;
    };
  }, []);

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisWrapper;
