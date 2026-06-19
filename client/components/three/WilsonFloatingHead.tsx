"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MAX_YAW = 0.55;
const MAX_PITCH_UP = 0.28;
const MAX_PITCH_DOWN = 0.42;
const EYE_ANCHOR_Y = 0.36;
const FOCAL_SCALE = 0.85;
const MOUSE_SMOOTH_SPEED = 7;
const ROTATION_DAMP = 4.5;

const LOCKED_YAW = -0.5;
const LOCKED_PITCH = -0.1;

export default function WilsonFloatingHead({ locked }: { locked?: boolean }) {
  const { scene } = useGLTF("/models/WilsonFloatingHead.glb");
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const smoothedOffset = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height * EYE_ANCHOR_Y;
      mouseOffset.current.x = e.clientX - eyeX;
      mouseOffset.current.y = e.clientY - eyeY;
    };

    const onMouseLeave = () => {
      mouseOffset.current.x = 0;
      mouseOffset.current.y = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (locked) {
      targetRotation.current.y = LOCKED_YAW;
      targetRotation.current.x = LOCKED_PITCH;
    } else {
      const mouseBlend = 1 - Math.exp(-MOUSE_SMOOTH_SPEED * delta);
      smoothedOffset.current.x = THREE.MathUtils.lerp(
        smoothedOffset.current.x,
        mouseOffset.current.x,
        mouseBlend,
      );
      smoothedOffset.current.y = THREE.MathUtils.lerp(
        smoothedOffset.current.y,
        mouseOffset.current.y,
        mouseBlend,
      );

      const rect = gl.domElement.getBoundingClientRect();
      const focal = Math.max(rect.width * FOCAL_SCALE, 60);
      const { x: dx, y: dy } = smoothedOffset.current;

      targetRotation.current.y = THREE.MathUtils.clamp(
        Math.atan2(dx, focal),
        -MAX_YAW,
        MAX_YAW,
      );
      targetRotation.current.x = THREE.MathUtils.clamp(
        Math.atan2(dy, focal),
        -MAX_PITCH_UP,
        MAX_PITCH_DOWN,
      );
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      ROTATION_DAMP,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      ROTATION_DAMP,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={0.9}>
      <primitive object={scene} castShadow />
    </group>
  );
}
