"use client";

import { useMemo } from "react";
import { BOUNDARY_RADIUS, GROUND_SIZE } from "./constants";

const GROUND_COLOR = "#16162a";
const ACCENT = "#0141ff"; // accent-500
const POST_COLOR = "#0141ff"; // accent-500

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
