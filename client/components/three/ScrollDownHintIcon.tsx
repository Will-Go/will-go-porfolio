"use client";

import { motion } from "framer-motion";

export function ScrollDownHintIcon() {
  return (
    <motion.span
      aria-hidden
      className="relative flex h-7 w-5 flex-col items-center justify-center rounded-md border border-accent-500/30 bg-accent-500/10"
    >
      <span className="mb-0.5 h-1 w-0.5 rounded-full bg-accent-400/80" />
      <motion.span
        animate={{ y: [0, 3, 0], opacity: [0.45, 1, 0.45] }}
        transition={{
          duration: 1.4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="h-0 w-0 border-x-[3px] border-t-4 border-x-transparent border-t-accent-400"
      />
    </motion.span>
  );
}
