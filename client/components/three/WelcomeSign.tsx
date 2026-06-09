"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { WELCOME_ZONE } from "./constants";

export function WelcomeSign({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF("/models/welcome3D.glb");
  const groupRef = useRef<THREE.Group>(null);
  const baseY = 2.2;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        baseY + Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[WELCOME_ZONE.x, baseY, WELCOME_ZONE.z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <primitive object={scene.clone(true)} scale={0.8} />
    </group>
  );
}
