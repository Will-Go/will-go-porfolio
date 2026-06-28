"use client";

import { motion } from "framer-motion";

export function ScrollDownHintIcon() {
  return (
    <motion.span
      aria-hidden
      className="relative flex h-9 w-6 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-accent-400/70 bg-transparent"
    >
      <span className="mb-1 h-1.5 w-1 rounded-full bg-accent-400" />
      <motion.span
        animate={{ y: [0, 4, 0], opacity: [0.45, 1, 0.45] }}
        transition={{
          duration: 1.3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="h-0 w-0 border-x-[3.5px] border-t-[5px] border-x-transparent border-t-accent-400"
      />
    </motion.span>
  );
}
