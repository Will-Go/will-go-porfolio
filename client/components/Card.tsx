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
        "cursor-default group relative overflow-hidden border-2 border-gray-200 dark:border-primary-700/30 p-3 rounded-md  w-full bg-linear-to-tl hover:bg-white dark:hover:bg-primary-800 from-gray-50 dark:from-primary-950 bg-white dark:bg-primary-900/60 !transition-all ease-in-out duration-500 shadow-sm hover:shadow-md dark:shadow-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export default Card;
