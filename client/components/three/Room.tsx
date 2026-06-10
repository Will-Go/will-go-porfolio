"use client";

import { useMemo } from "react";
import { BOUNDARY_RADIUS, GROUND_SIZE, STATIONS } from "./constants";

const GROUND_COLOR = "#16162a";
const ACCENT = "#0141ff"; // accent-500
// Dark accent shades from globals.css (--color-accent-600 → 900)
const BLOCK_COLORS = [
  "#0139cc", // accent-600
  "#013199", // accent-700
  "#002966", // accent-800
  "#002033", // accent-900
  "#111c35", // ground + accent-900 blend
];
const POST_COLOR = "#0141ff"; // accent-500

// Deterministic PRNG so decoration is stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface IVoxelBlock {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

function buildPosts(): {
  position: [number, number, number];
  height: number;
}[] {
  const count = 48;
  const posts: { position: [number, number, number]; height: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const height = i % 4 === 0 ? 2.6 : 1.6;
    posts.push({
      position: [
        Math.cos(angle) * BOUNDARY_RADIUS,
        height / 2,
        Math.sin(angle) * BOUNDARY_RADIUS,
      ],
      height,
    });
  }
  return posts;
}

export function Room() {
  const posts = useMemo(buildPosts, []);

  return (
    <group>
      {/* Voxel ground */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshStandardMaterial
          color={GROUND_COLOR}
          roughness={0.95}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Subtle accent grid */}
      <gridHelper
        args={[GROUND_SIZE, GROUND_SIZE, ACCENT, ACCENT]}
        position-y={0.01}
      >
        <meshBasicMaterial attach="material" transparent opacity={0.07} />
      </gridHelper>

      {/* Glowing perimeter posts mark the boundary */}
      {posts.map((post) => (
        <mesh key={post.position.join(",")} position={post.position}>
          <boxGeometry args={[0.35, post.height, 0.35]} />
          <meshStandardMaterial
            color={POST_COLOR}
            emissive={POST_COLOR}
            emissiveIntensity={1.1}
            roughness={0.4}
            metalness={0.3}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
