"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HeroMorphOrb() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "88vw"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  if (prefersReducedMotion) {
    return (
      <div aria-hidden className="hero-morph-orb hero-morph-orb--static">
        <div className="hero-morph-orb__glow" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="hero-morph-orb animate-fade-in"
      style={{ x, y: "-50%", scale }}
    >
      <div className="hero-morph-orb__glow" />
    </motion.div>
  );
}
