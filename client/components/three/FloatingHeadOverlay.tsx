"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import WilsonFloatingHead from "@/components/three/WilsonFloatingHead";
import { PanelContent } from "./PanelContent";

export default function FloatingHeadOverlay({
  showWelcome,
  locked,
}: {
  showWelcome?: boolean;
  locked?: boolean;
}) {
  const headVariants = {
    initial: { opacity: 0, x: 200, y: 200, scale: 0.5 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    exit: {
      opacity: 0,
      x: 200,
      y: 200,
      scale: 0.5,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  const bubbleVariants = {
    initial: { opacity: 0, x: 100, y: 100, scale: 0.8 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
    exit: {
      opacity: 0,
      x: 100,
      y: 100,
      scale: 0.8,
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <div className="fixed bottom-3 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome-bubble"
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative right-20 bottom-5 max-w-[400px] w-[80vw]"
          >
            <div className="relative rounded-2xl border border-accent-500/20 bg-black/50 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(1,65,255,0.08)] text-white">
              <PanelContent zone="welcome" />
            </div>
            <div className="absolute -bottom-2 right-8 w-3 h-3 bg-black/50 backdrop-blur-xl border-r border-b border-accent-500/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={headVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-none"
        style={{ width: 140, height: 200 }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 3, 4]} intensity={1} />
            <WilsonFloatingHead locked={locked} />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
}
