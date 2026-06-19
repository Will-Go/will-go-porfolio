"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BOUNDARY_RADIUS, PLAYER_RADIUS } from "./constants";

const WALL_HEIGHT = 7;
// How far from the edge the field starts to fade in.
const FADE_DISTANCE = 7;
// Width of the lit grid section that tracks the player around the ring.
const GLOW_RADIUS = 10;
// Square grid cells around the circumference (integer keeps the seam aligned).
const RING_CELLS = 108;
const CIRCUMFERENCE = 2 * Math.PI * BOUNDARY_RADIUS;
const CELL_SIZE = CIRCUMFERENCE / RING_CELLS;

const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uPlayer;
  uniform float uProximity;
  uniform float uGlowRadius;
  uniform float uRingCells;
  uniform float uCellSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  float gridLine(vec2 coord) {
    vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = min(g.x, g.y);
    return 1.0 - min(line, 1.0);
  }

  void main() {
    // Square grid: x wraps around the ring, y climbs the wall.
    float cx = vUv.x * uRingCells;
    float cy = vWorldPos.y / uCellSize;
    float grid = gridLine(vec2(cx, cy));

    // Localized hotspot that follows the player around the boundary.
    float d = distance(vWorldPos.xz, uPlayer.xz);
    float glow = 1.0 - smoothstep(0.0, uGlowRadius, d);
    glow = pow(glow, 1.6);

    // Dissolve toward the top so the wall feels like a force field.
    float vFade = 1.0 - smoothstep(0.45, 1.0, vUv.y);

    // Gentle vertical scan pulse.
    float pulse = 0.8 + 0.2 * sin(uTime * 2.0 - vWorldPos.y * 1.2);

    float fill = 0.04; // faint panel tint between the lines
    float alpha = (grid * 0.85 + fill) * glow * uProximity * vFade * pulse;
    if (alpha <= 0.001) discard;

    vec3 col = mix(uColorA, uColorB, clamp(vUv.y, 0.0, 1.0));
    gl_FragColor = vec4(col, alpha);
  }
`;

export function BoundaryField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPlayer: { value: new THREE.Vector3() },
      uProximity: { value: 0 },
      uGlowRadius: { value: GLOW_RADIUS },
      uRingCells: { value: RING_CELLS },
      uCellSize: { value: CELL_SIZE },
      uColorA: { value: new THREE.Color("#0141ff") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
    }),
    [],
  );

  useFrame(({ camera, clock }) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPlayer.value.set(
      camera.position.x,
      camera.position.y,
      camera.position.z,
    );
    const dist = Math.hypot(camera.position.x, camera.position.z);
    material.uniforms.uProximity.value = THREE.MathUtils.smoothstep(
      dist,
      BOUNDARY_RADIUS - FADE_DISTANCE,
      BOUNDARY_RADIUS - PLAYER_RADIUS,
    );
  });

  return (
    <mesh position-y={WALL_HEIGHT / 2}>
      <cylinderGeometry
        args={[BOUNDARY_RADIUS, BOUNDARY_RADIUS, WALL_HEIGHT, 128, 1, true]}
      />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
