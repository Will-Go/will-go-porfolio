"use client";

import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { COMPUTER_SCALE, COMPUTER_Y } from "./constants";

const MODEL_URL = "/models/voxel_computer_table.glb";

interface IVoxelComputerTableProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

const VoxelComputerTable = forwardRef<THREE.Group, IVoxelComputerTableProps>(
  ({ onClick, onPointerOver, onPointerOut }, ref) => {
    const { scene } = useGLTF(MODEL_URL);
    const model = useMemo(() => scene.clone(true), [scene]);

    return (
      <group
        ref={ref}
        position-y={COMPUTER_Y}
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
  },
);

VoxelComputerTable.displayName = "VoxelComputerTable";

export default VoxelComputerTable;

useGLTF.preload(MODEL_URL);
