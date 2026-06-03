"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { cn } from "@/utils/cn";

type AnimationType =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scale"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "rotateIn"
  | "flipUp";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: AnimationType;
  distance?: number;
  scale?: number;
  rotation?: number;
  once?: boolean;
  fadeOutOnExit?: boolean;
  threshold?: number;
  easing?:
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "circIn"
    | "circOut"
    | "circInOut"
    | "backIn"
    | "backOut"
    | "backInOut"
    | "anticipate";
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
    visible: { opacity: 1, rotateX: 0, transformPerspective: 1000 },
  },
};

const easingMap = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  circIn: [0.6, 0.04, 0.98, 0.335],
  circOut: [0.075, 0.82, 0.165, 1],
  circInOut: [0.785, 0.135, 0.15, 0.86],
  backIn: [0.6, -0.28, 0.735, 0.045],
  backOut: [0.175, 0.885, 0.32, 1.275],
  backInOut: [0.68, -0.55, 0.265, 1.55],
  anticipate: [0.215, 0.61, 0.355, 1],
} as const;

function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  animationType = "fadeUp",
  distance = 20,
  scale = 0.9,
  rotation = -10,
  once = true,
  fadeOutOnExit = false,
  threshold = 0.1,
  easing = "easeOut",
}: RevealProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px -50px 0px",
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0, 1, 0],
  );

  const customVariants: Variants = {
    hidden: {
      ...animationVariants[animationType].hidden,
      ...(animationType.includes("slide") && {
        y:
          animationType === "slideUp"
            ? distance
            : animationType === "slideDown"
            ? -distance
            : 0,
        x:
          animationType === "slideLeft"
            ? distance
            : animationType === "slideRight"
            ? -distance
            : 0,
      }),
      ...(animationType.includes("fade") &&
        animationType !== "fadeIn" && {
          y:
            animationType === "fadeUp"
              ? distance
              : animationType === "fadeDown"
              ? -distance
              : 0,
          x:
            animationType === "fadeLeft"
              ? distance
              : animationType === "fadeRight"
              ? -distance
              : 0,
        }),
      ...(animationType === "scale" && { scale }),
      ...(animationType === "rotateIn" && { rotate: rotation, scale }),
    },
    visible: animationVariants[animationType].visible,
  };

  return (
    <motion.div
      className={cn("", className)}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={customVariants}
      transition={{
        duration,
        delay,
        ease: easingMap[easing],
        type: "tween",
      }}
      style={fadeOutOnExit ? { opacity: scrollOpacity } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
