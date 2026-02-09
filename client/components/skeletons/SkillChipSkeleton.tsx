import { motion } from "framer-motion";

const SkillChipSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="w-full max-w-[140px]"
    >
      <div className="relative flex flex-col rounded-2xl items-center justify-center border-2 border-gray-200 dark:border-primary-800/60 p-4 bg-white/50 dark:bg-primary-950/50 backdrop-blur-sm">
        {/* Name Skeleton */}
        <div className="h-4 w-20 bg-gray-200 dark:bg-primary-800 rounded-md animate-pulse mb-2" />

        {/* Duration Skeleton */}
        <div className="h-3 w-12 bg-gray-100 dark:bg-primary-900 rounded-md animate-pulse" />
      </div>
    </motion.div>
  );
};

export default SkillChipSkeleton;
