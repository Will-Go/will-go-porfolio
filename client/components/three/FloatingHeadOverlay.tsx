"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import WilsonFloatingHead from "@/components/three/WilsonFloatingHead";

export default function FloatingHeadOverlay() {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{ width: 140, height: 200 }}
    >
      <Canvas
        camera={{ position: [3.5, 0, 3], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 3, 4]} intensity={1} />
          <WilsonFloatingHead />
        </Suspense>
      </Canvas>
    </div>
  );
}
