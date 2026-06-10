"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { COMPUTER_SCALE, COMPUTER_Y } from "./constants";

const MODEL_URL = "/models/voxel_computer_table.glb";

interface IVoxelComputerTableProps {
  bobPhase?: number;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export default function VoxelComputerTable({
  bobPhase = 0,
  onClick,
  onPointerOver,
  onPointerOut,
}: IVoxelComputerTableProps) {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      COMPUTER_Y + Math.sin(clock.getElapsedTime() * 1.4 + bobPhase) * 0.06;
  });

  return (
    <group
      ref={groupRef}
      scale={COMPUTER_SCALE}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver?.();
      }}
      onPointerOut={onPointerOut}
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
