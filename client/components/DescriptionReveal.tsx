"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/utils/cn";

type DescriptionElement = "p" | "span" | "div";

type IViewportMargin = NonNullable<
  NonNullable<Parameters<typeof useInView>[1]>["margin"]
>;

interface IDescriptionRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: DescriptionElement;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
  scale?: number;
  once?: boolean;
  threshold?: number;
  viewportMargin?: IViewportMargin;
}

const easing = [0, 0, 0.2, 1] as const;

function DescriptionReveal({
  children,
  className,
  as = "p",
  delay = 0,
  duration = 0.9,
  distance = 28,
  blur = 12,
  scale = 0.92,
  once = true,
  threshold = 0.1,
  viewportMargin = "0px 0px -50px 0px",
}: IDescriptionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: viewportMargin,
  });

  useEffect(() => {
    if (prefersReducedMotion || isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const isVisibleOnMount =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;

    if (isVisibleOnMount) {
      controls.start("visible");
    }
  }, [controls, prefersReducedMotion]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: -distance,
      scale,
      filter: `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  const MotionTag = motion[as];

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <MotionTag
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion ? "visible" : controls}
        variants={variants}
        transition={{
          duration: prefersReducedMotion ? 0 : duration,
          delay: prefersReducedMotion ? 0 : delay,
          ease: easing,
          type: "tween",
        }}
      >
        {children}
      </MotionTag>
    </div>
  );
}

export default DescriptionReveal;
