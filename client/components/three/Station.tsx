"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useTranslations } from "next-intl";
import type * as THREE from "three";
import { cn } from "@/utils/cn";
import VoxelComputerTable from "./VoxelComputerTable";
import { StationClickHint } from "./StationClickHint";
import {
  FaHome,
  FaUser,
  FaGithub,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaCheck,
} from "react-icons/fa";
import {
  STATION_CIRCLE_RADIUS,
  STATION_COLLIDER,
  type IStation,
} from "./constants";

const ACCENT = "#0141ff";
const VISITED = "#22c55e"; // green-500

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
  visited,
  isNext,
  panelOpen,
  onClick,
}: {
  station: IStation;
  title: string;
  hovered: boolean;
  visited: boolean;
  isNext: boolean;
  panelOpen: boolean;
  onClick: () => void;
}) {
  const tHint = useTranslations("threeExperience");
  const { camera } = useThree();
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);
  const [playerInZone, setPlayerInZone] = useState(false);
  const active = hovered || localHover;
  const Icon = ICONS[station.id] ?? FaHome;
  const color = visited ? VISITED : ACCENT;
  const showClickHint = playerInZone && !panelOpen;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      const pulse = isNext ? Math.sin(t * 3 + station.step) * 0.3 : 0;
      mat.opacity =
        0.45 +
        Math.sin(t * 2 + station.step) * 0.2 +
        (active ? 0.25 : 0) +
        pulse;
    }

    const dx = camera.position.x - station.position[0];
    const dz = camera.position.z - station.position[2];
    const inZone =
      dx * dx + dz * dz <
      (STATION_CIRCLE_RADIUS + 0.18) * (STATION_CIRCLE_RADIUS + 0.18);
    if (inZone !== playerInZone) setPlayerInZone(inZone);
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
          color={color}
          transparent
          opacity={active ? 0.2 : 0.12}
        />
      </mesh>
      <mesh ref={ringRef} rotation-x={-Math.PI / 2} position-y={0.02}>
        <ringGeometry
          args={[STATION_CIRCLE_RADIUS - 0.18, STATION_CIRCLE_RADIUS, 48]}
        />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>

      <VoxelComputerTable
        bobPhase={station.step}
        onClick={onClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      />

      {/* Invisible collision volume — resolved in Player.tsx */}
      <mesh position={[0, STATION_COLLIDER.centerY, 0]} visible={false}>
        <boxGeometry
          args={[
            STATION_COLLIDER.halfWidth * 2,
            STATION_COLLIDER.height,
            STATION_COLLIDER.halfDepth * 2,
          ]}
        />
      </mesh>

      <StationClickHint
        visible={showClickHint}
        label={tHint("clickComputer")}
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
            visited
              ? "bg-green-500/20 border-green-500/50 hover:bg-green-500/25"
              : active
                ? "bg-accent-500/25 border-accent-500/60 scale-110 shadow-[0_0_20px_rgba(1,65,255,0.3)]"
                : "bg-black/50 border-accent-500/30 hover:bg-accent-500/20 hover:border-accent-500/50 hover:scale-105",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center w-5 h-5 rounded-full border text-[10px] font-bold",
              visited
                ? "bg-green-500/30 border-green-500/50 text-green-300"
                : "bg-accent-500/30 border-accent-500/50 text-accent-300",
            )}
          >
            {visited ? <FaCheck className="text-[9px]" /> : station.step}
          </span>
          <Icon
            className={cn(
              "text-base",
              visited ? "text-green-400" : "text-accent-400",
            )}
          />
          {title}
        </button>
      </Html>
    </group>
  );
}
