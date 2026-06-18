"use client";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

interface LenisWrapperProps {
  children: React.ReactNode;
}

function LenisWrapper({ children }: LenisWrapperProps) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          lerp: 0.08,
          smoothWheel: true,
        }}
      />
      {children}
    </>
  );
}

export default LenisWrapper;
