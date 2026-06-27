"use client";

import { motion } from "framer-motion";

export function ScrollDownHintIcon() {
  return (
    <motion.span
      aria-hidden
      className="relative flex h-10 w-7 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-accent-400/50 bg-accent-500/20 shadow-[0_0_12px_rgba(1,65,255,0.25)]"
    >
      <span className="mb-1 h-1.5 w-1 rounded-full bg-accent-300" />
      <motion.span
        animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="h-0 w-0 border-x-4 border-t-[6px] border-x-transparent border-t-accent-300"
      />
    </motion.span>
  );
}
