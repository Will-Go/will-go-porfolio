"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import { cn } from "@/utils/cn";
import VoxelComputerTable from "./VoxelComputerTable";
import {
  FaHome,
  FaUser,
  FaGithub,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import { STATION_CIRCLE_RADIUS, type IStation } from "./constants";

const ACCENT = "#0141ff";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  welcome: FaHome,
  about: FaUser,
  projects: FaGithub,
  skills: FaCode,
  education: FaGraduationCap,
  experience: FaBriefcase,
};

export function Station({
  station,
  title,
  hovered,
  onClick,
}: {
  station: IStation;
  title: string;
  hovered: boolean;
  onClick: () => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);
  const active = hovered || localHover;
  const Icon = ICONS[station.id] ?? FaHome;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        0.45 + Math.sin(t * 2 + station.step) * 0.2 + (active ? 0.25 : 0);
    }
  });

  const handleOver = () => {
    setLocalHover(true);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setLocalHover(false);
    document.body.style.cursor = "";
  };

  return (
    <group position={station.position}>
      {/* Glowing floor circle */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.015}>
        <circleGeometry args={[STATION_CIRCLE_RADIUS, 48]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={active ? 0.2 : 0.12}
        />
      </mesh>
      <mesh ref={ringRef} rotation-x={-Math.PI / 2} position-y={0.02}>
        <ringGeometry
          args={[STATION_CIRCLE_RADIUS - 0.18, STATION_CIRCLE_RADIUS, 48]}
        />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </mesh>

      <VoxelComputerTable
        bobPhase={station.step}
        onClick={onClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      />

      {/* Step + title label */}
      <Html
        position={[0, 2.7, 0]}
        center
        distanceFactor={9}
        zIndexRange={[1400, 1400]}
        style={{ pointerEvents: "auto" }}
      >
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border text-white text-sm font-medium cursor-pointer active:scale-95 transition-all duration-300 whitespace-nowrap",
            active
              ? "bg-accent-500/25 border-accent-500/60 scale-110 shadow-[0_0_20px_rgba(1,65,255,0.3)]"
              : "bg-black/50 border-accent-500/30 hover:bg-accent-500/20 hover:border-accent-500/50 hover:scale-105",
          )}
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-500/30 border border-accent-500/50 text-accent-300 text-[10px] font-bold">
            {station.step}
          </span>
          <Icon className="text-accent-400 text-base" />
          {title}
        </button>
      </Html>
    </group>
  );
}
