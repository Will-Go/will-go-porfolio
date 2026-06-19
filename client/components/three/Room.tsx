"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { GROUND_SIZE } from "./constants";
import { BoundaryField } from "./BoundaryField";

const ACCENT = "#0141ff"; // accent-500
const GROUND_RADIUS = GROUND_SIZE / 2;
const GROUND_SOFT_BORDER = 5;

const domeVertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const domeFragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vDir;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  void main() {
    float h = vDir.y;
    vec3 col = h > 0.0
      ? mix(uHorizon, uTop, pow(h, 0.5))
      : mix(uHorizon, uBottom, pow(-h, 0.7));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientDome() {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color("#05050f") },
      uHorizon: { value: new THREE.Color("#1b1450") },
      uBottom: { value: new THREE.Color("#020207") },
    }),
    [],
  );

  return (
    <mesh>
      <sphereGeometry args={[70, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={domeVertexShader}
        fragmentShader={domeFragmentShader}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

function useGroundMaterial() {
  return useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      depthWrite: false,
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute float groundAlpha;
varying float vGroundAlpha;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vGroundAlpha = groundAlpha;`,
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
varying float vGroundAlpha;`,
        )
        .replace(
          "#include <opaque_fragment>",
          `#include <opaque_fragment>
gl_FragColor.a *= vGroundAlpha;`,
        );
    };
    material.customProgramCacheKey = () => "ground-soft-alpha-v1";
    return material;
  }, []);
}

function clipSegmentToCircle(
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  radius: number,
): [number, number, number, number] | null {
  const d1 = x1 * x1 + z1 * z1;
  const d2 = x2 * x2 + z2 * z2;
  const r2 = radius * radius;

  if (d1 <= r2 && d2 <= r2) {
    return [x1, z1, x2, z2];
  }

  const dx = x2 - x1;
  const dz = z2 - z1;
  const a = dx * dx + dz * dz;
  if (a < 1e-10) return null;

  const b = 2 * (x1 * dx + z1 * dz);
  const c = d1 - r2;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return null;

  const sqrtDisc = Math.sqrt(discriminant);
  const tEnter = (-b - sqrtDisc) / (2 * a);
  const tExit = (-b + sqrtDisc) / (2 * a);
  const tMin = Math.max(0, Math.min(tEnter, tExit));
  const tMax = Math.min(1, Math.max(tEnter, tExit));
  if (tMin > tMax) return null;

  return [
    x1 + dx * tMin,
    z1 + dz * tMin,
    x1 + dx * tMax,
    z1 + dz * tMax,
  ];
}

function useCircularAccentGridGeometry() {
  return useMemo(() => {
    const divisions = GROUND_SIZE;
    const half = GROUND_RADIUS;
    const step = GROUND_SIZE / divisions;
    const vertices: number[] = [];

    const pushSegment = (x1: number, z1: number, x2: number, z2: number) => {
      const clipped = clipSegmentToCircle(x1, z1, x2, z2, GROUND_RADIUS);
      if (!clipped) return;
      vertices.push(clipped[0], clipped[1], 0.01, clipped[2], clipped[3], 0.01);
    };

    for (let i = 0; i <= divisions; i++) {
      const offset = -half + i * step;
      pushSegment(offset, -half, offset, half);
      pushSegment(-half, offset, half, offset);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    return geometry;
  }, []);
}

function useGradientGroundGeometry() {
  return useMemo(() => {
    const segments = 48;
    const geometry = new THREE.PlaneGeometry(
      GROUND_SIZE,
      GROUND_SIZE,
      segments,
      segments,
    );
    const position = geometry.attributes.position;
    const inner = new THREE.Color("#23234d");
    const outer = new THREE.Color("#0a0a17");
    const tmp = new THREE.Color();
    const colors = new Float32Array(position.count * 3);
    const alphas = new Float32Array(position.count);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i); // becomes world Z after the -90deg rotation
      const dist = Math.hypot(x, y);
      const distNorm = Math.min(1, dist / GROUND_RADIUS);
      const t = THREE.MathUtils.smoothstep(distNorm, 0.0, 0.75);
      tmp.copy(inner).lerp(outer, t);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
      alphas[i] = 1 - THREE.MathUtils.smoothstep(
        dist,
        GROUND_RADIUS - GROUND_SOFT_BORDER,
        GROUND_RADIUS,
      );
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute(
      "groundAlpha",
      new THREE.BufferAttribute(alphas, 1),
    );

    const index = geometry.index;
    if (index) {
      const kept: number[] = [];
      for (let i = 0; i < index.count; i += 3) {
        const ai = index.getX(i);
        const bi = index.getX(i + 1);
        const ci = index.getX(i + 2);
        const ax = position.getX(ai);
        const ay = position.getY(ai);
        const bx = position.getX(bi);
        const by = position.getY(bi);
        const cx = position.getX(ci);
        const cy = position.getY(ci);
        const centroidDist = Math.hypot(
          (ax + bx + cx) / 3,
          (ay + by + cy) / 3,
        );
        if (centroidDist <= GROUND_RADIUS) {
          kept.push(ai, bi, ci);
        }
      }
      geometry.setIndex(kept);
    }

    return geometry;
  }, []);
}

export function Room() {
  const groundGeometry = useGradientGroundGeometry();
  const groundMaterial = useGroundMaterial();
  const accentGridGeometry = useCircularAccentGridGeometry();

  return (
    <group>
      <GradientDome />

      {/* Radial-gradient voxel ground */}
      <mesh
        geometry={groundGeometry}
        material={groundMaterial}
        rotation-x={-Math.PI / 2}
        receiveShadow
      />

      {/* Subtle accent grid clipped to the circular ground */}
      <lineSegments geometry={accentGridGeometry} rotation-x={-Math.PI / 2}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.07} />
      </lineSegments>

      {/* Futuristic force-field boundary that follows the player near the edge */}
      <BoundaryField />
    </group>
  );
}
