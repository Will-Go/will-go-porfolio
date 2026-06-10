"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";
import { PATH_WIDTH, STATION_CIRCLE_RADIUS, STATIONS } from "./constants";
import { useStationStore } from "@/stores/useStationStore";

const ACCENT = "#0141ff";
const DASH_SPACING = 0.75;
const DASH_LENGTH = 0.45;
const FLOW_SPEED = 4; // units per second the pulse travels toward the station
const MAX_DASHES = 80; // pooled meshes reused as the player moves
const START_OFFSET = 1.5; // keep the trail from rendering under the player's feet

export function PathTrail() {
  const { camera } = useThree();
  const nextStationId = useStationStore((s) => s.nextStationId);

  const target = useMemo(() => {
    const station = STATIONS.find((s) => s.id === nextStationId);
    return station ? station.position : null;
  }, [nextStationId]);
  const targetRef = useRef(target);
  targetRef.current = target;

  const meshes = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const dest = targetRef.current;
    const pool = meshes.current;

    if (!dest) {
      for (const mesh of pool) if (mesh) mesh.visible = false;
      return;
    }

    const px = camera.position.x;
    const pz = camera.position.z;
    const dx = dest[0] - px;
    const dz = dest[2] - pz;
    const dist = Math.hypot(dx, dz);

    if (dist < 0.001) {
      for (const mesh of pool) if (mesh) mesh.visible = false;
      return;
    }

    const nx = dx / dist;
    const nz = dz / dist;
    const rotationY = -Math.atan2(dz, dx);

    const start = Math.min(START_OFFSET, dist);
    const end = Math.max(start, dist - STATION_CIRCLE_RADIUS);
    const span = end - start;
    const count = Math.min(
      MAX_DASHES,
      Math.max(0, Math.floor(span / DASH_SPACING)),
    );

    const head = (clock.getElapsedTime() * FLOW_SPEED) % (span + 6);

    for (let i = 0; i < pool.length; i++) {
      const mesh = pool[i];
      if (!mesh) continue;
      if (i >= count) {
        mesh.visible = false;
        continue;
      }
      mesh.visible = true;
      const along = (i + 0.5) * DASH_SPACING;
      const d = start + along;
      mesh.position.set(px + nx * d, 0.02, pz + nz * d);
      mesh.rotation.set(-Math.PI / 2, 0, rotationY);

      const material = mesh.material as THREE.MeshBasicMaterial;
      let delta = head - along;
      if (delta < 0) delta += span + 6;
      const pulse = delta < 4 ? 1 - delta / 4 : 0;
      material.opacity = 0.18 + pulse * 0.72;
    }
  });

  return (
    <group>
      {Array.from({ length: MAX_DASHES }).map((_, i) => (
        <mesh
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-size reused pool
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          visible={false}
        >
          <planeGeometry args={[DASH_LENGTH, PATH_WIDTH]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  );
}
