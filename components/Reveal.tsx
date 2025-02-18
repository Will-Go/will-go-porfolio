"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Reveal({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      transition={{ duration: 1 }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
