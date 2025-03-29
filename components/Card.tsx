"use client";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
interface CardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className, ...motionProps }: Readonly<CardProps>) {
  return (
    <motion.div
      {...motionProps}
      className={cn(
        "cursor-default group relative overflow-hidden border-2 border-primary-700/30 p-3 rounded-md  w-full bg-linear-to-tl hover:bg-primary-800 from-primary-950 bg-primary-900/60 !transition-all ease-in-out duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default Card;
