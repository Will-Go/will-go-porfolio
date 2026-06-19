"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { GROUND_SIZE } from "./constants";
import { BoundaryField } from "./BoundaryField";

const ACCENT = "#0141ff"; // accent-500

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
    const half = GROUND_SIZE / 2;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i); // becomes world Z after the -90deg rotation
      const dist = Math.min(1, Math.hypot(x, y) / half);
      const t = THREE.MathUtils.smoothstep(dist, 0.0, 0.75);
      tmp.copy(inner).lerp(outer, t);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);
}

export function Room() {
  const groundGeometry = useGradientGroundGeometry();

  return (
    <group>
      <GradientDome />

      {/* Radial-gradient voxel ground */}
      <mesh geometry={groundGeometry} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.9}
          metalness={0.1}
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

      {/* Futuristic force-field boundary that follows the player near the edge */}
      <BoundaryField />
    </group>
  );
}
