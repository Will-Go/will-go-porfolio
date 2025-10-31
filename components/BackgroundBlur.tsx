//UTILS
import { cn } from "@/utils/cn";

interface BackgroundBlurProps {
  className?: string;
}

export default function BackgroundBlur({
  className,
}: Readonly<BackgroundBlurProps>) {
  return (
    <div
      className={cn(
        `absolute blur-[100px] rounded-full bg-accent-500/30 animate-pulse z-[-1]`,
        className
      )}
    ></div>
  );
}
