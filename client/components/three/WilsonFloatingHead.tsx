"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function WilsonFloatingHead() {
  const { scene } = useGLTF("/models/WilsonFloatingHead.glb");
  const groupRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onMouseLeave = () => {
      mousePos.current.x = 0;
      mousePos.current.y = 0;
    };
    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    targetRotation.current.y = mousePos.current.x * 0.5;
    targetRotation.current.x = -mousePos.current.y * 0.3;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.15,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.15,
    );
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <primitive object={scene} castShadow />
    </group>
  );
}
