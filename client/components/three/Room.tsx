"use client";

import { useMemo } from "react";
import { BOUNDARY_RADIUS, GROUND_SIZE, STATIONS } from "./constants";

const GROUND_COLOR = "#16162a";
const ACCENT = "#0141ff";
const BLOCK_COLORS = ["#1e1e38", "#242447", "#2a2a52", "#1a1a30", "#312b5c"];
const POST_COLOR = "#0141ff";

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

function buildBlocks(): IVoxelBlock[] {
  const rand = mulberry32(1337);
  const blocks: IVoxelBlock[] = [];
  let attempts = 0;
  while (blocks.length < 70 && attempts < 600) {
    attempts++;
    const angle = rand() * Math.PI * 2;
    const radius = 9 + rand() * (BOUNDARY_RADIUS - 11);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // Keep clear of stations so they never overlap a computer/circle.
    const tooClose = STATIONS.some((s) => {
      const dx = x - s.position[0];
      const dz = z - s.position[2];
      return dx * dx + dz * dz < 4 * 4;
    });
    if (tooClose) continue;

    const w = 0.6 + rand() * 1.6;
    const h = 0.4 + rand() * 2.4;
    const d = 0.6 + rand() * 1.6;
    blocks.push({
      position: [x, h / 2, z],
      size: [w, h, d],
      color: BLOCK_COLORS[Math.floor(rand() * BLOCK_COLORS.length)],
    });
  }
  return blocks;
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
  const blocks = useMemo(buildBlocks, []);
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

      {/* Scattered low-poly voxel terrain */}
      {blocks.map((block) => (
        <mesh
          key={block.position.join(",")}
          position={block.position}
          castShadow
        >
          <boxGeometry args={block.size} />
          <meshStandardMaterial
            color={block.color}
            roughness={0.85}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}

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
