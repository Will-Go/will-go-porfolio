"use client";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

interface FadeInOutProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  threshold?: number;
  maxBlur?: number;
}

function FadeInOut({
  children,
  className,
  distance = 20,
  threshold = 0.1,
  maxBlur = 12,
}: FadeInOutProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fadeWidth = 0.2 + (distance / 20) * 0.15;
  const thresholdOffset = threshold * 0.15;
  const midPoint = 0.5;
  const fadeInStart = Math.max(midPoint - fadeWidth - thresholdOffset, 0.02);
  const fadeOutEnd = Math.min(midPoint + fadeWidth + thresholdOffset, 0.98);

  const scrollOpacity = useTransform(
    scrollYProgress,
    [fadeInStart, midPoint, fadeOutEnd],
    [0, 1, 0],
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [fadeInStart, midPoint, fadeOutEnd],
    [0.75, 1, 0.75],
  );

  const scrollBlur = useTransform(
    scrollYProgress,
    [fadeInStart, midPoint, fadeOutEnd],
    [maxBlur, 0, maxBlur],
  );

  const blurFilter = useMotionTemplate`blur(${scrollBlur}px)`;

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      style={{
        opacity: scrollOpacity,
        scale: scrollScale,
        filter: blurFilter,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeInOut;
