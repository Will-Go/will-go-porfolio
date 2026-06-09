"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  HALF_W,
  HALF_D,
  PLAYER_RADIUS,
  PLAYER_EYE_HEIGHT,
  PLAYER_SPEED,
  WELCOME_ZONE,
  WALL_SECTIONS,
} from "./constants";

const moveVec = new THREE.Vector3();
const forwardVec = new THREE.Vector3();
const rightVec = new THREE.Vector3();
const rayDir = new THREE.Vector3();
const raycaster = new THREE.Raycaster();

interface PlayerProps {
  onWelcomeZoneChange: (inside: boolean) => void;
  onLockChange: (locked: boolean) => void;
  onSectionClick: (id: string) => void;
  onHoverChange: (id: string | null) => void;
  expandedPanel: string | null;
}

export default function Player({
  onWelcomeZoneChange,
  onLockChange,
  onSectionClick,
  onHoverChange,
  expandedPanel,
}: PlayerProps) {
  const { camera, gl, scene } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const isLocked = useRef(false);
  const inWelcome = useRef(false);
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const clock = useRef(new THREE.Clock());
  const hitTargets = useRef<THREE.Mesh[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const expandedPanelRef = useRef(expandedPanel);
  expandedPanelRef.current = expandedPanel;

  // Create invisible hit targets at wall label positions
  useEffect(() => {
    const targets = WALL_SECTIONS.map((section) => {
      const geo = new THREE.BoxGeometry(3, 1.5, 0.2);
      const mat = new THREE.MeshBasicMaterial({ visible: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...section.position);
      mesh.userData.sectionId = section.id;
      scene.add(mesh);
      return mesh;
    });
    hitTargets.current = targets;

    return () => {
      for (const mesh of targets) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
    };
  }, [scene]);

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    camera.position.set(
      WELCOME_ZONE.x + 2.5,
      PLAYER_EYE_HEIGHT,
      WELCOME_ZONE.z + 3.5,
    );
    camera.rotation.set(-Math.PI / 50, 0, 0);

    const onLock = () => {
      isLocked.current = document.pointerLockElement === canvas;
      onLockChange(isLocked.current);
      if (!isLocked.current) {
        hoveredRef.current = null;
        onHoverChange(null);
      }
    };

    const onMouse = (e: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= e.movementX * 0.002;
      euler.current.x -= e.movementY * 0.002;
      euler.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, euler.current.x),
      );
      camera.quaternion.setFromEuler(euler.current);
    };

    const onClick = () => {
      if (document.pointerLockElement) {
        if (hoveredRef.current) {
          onSectionClick(hoveredRef.current);
        }
      } else if (!expandedPanelRef.current) {
        canvas.requestPointerLock();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", onLock);
    document.addEventListener("mousemove", onMouse);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", onLock);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      if (document.pointerLockElement === canvas) {
        document.exitPointerLock();
      }
    };
  }, [camera, gl, onLockChange, onSectionClick, onHoverChange]);

  useFrame(() => {
    const dt = Math.min(clock.current.getDelta(), 0.1);
    const speed = PLAYER_SPEED * dt;
    const k = keys.current;

    camera.getWorldDirection(forwardVec);
    forwardVec.y = 0;
    forwardVec.normalize();
    rightVec.crossVectors(forwardVec, camera.up).normalize();

    moveVec.set(0, 0, 0);
    const f =
      Number(Boolean(k.KeyW || k.ArrowUp)) -
      Number(Boolean(k.KeyS || k.ArrowDown));
    const s =
      Number(Boolean(k.KeyD || k.ArrowRight)) -
      Number(Boolean(k.KeyA || k.ArrowLeft));
    if (f) moveVec.addScaledVector(forwardVec, f * speed);
    if (s) moveVec.addScaledVector(rightVec, s * speed);

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x + moveVec.x,
      -HALF_W + PLAYER_RADIUS,
      HALF_W - PLAYER_RADIUS,
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z + moveVec.z,
      -HALF_D + PLAYER_RADIUS,
      HALF_D - PLAYER_RADIUS,
    );
    camera.position.y = PLAYER_EYE_HEIGHT;

    // Welcome zone detection
    const dx = camera.position.x - WELCOME_ZONE.x;
    const dz = camera.position.z - WELCOME_ZONE.z;
    const nowInWelcome = dx * dx + dz * dz < WELCOME_ZONE.r * WELCOME_ZONE.r;
    if (nowInWelcome !== inWelcome.current) {
      inWelcome.current = nowInWelcome;
      onWelcomeZoneChange(nowInWelcome);
    }

    // Raycasting for wall label hover (only when locked)
    if (isLocked.current && hitTargets.current.length > 0) {
      camera.getWorldDirection(rayDir);
      raycaster.set(camera.position, rayDir);
      const hits = raycaster.intersectObjects(hitTargets.current);
      const hitId =
        hits.length > 0 ? (hits[0].object.userData.sectionId as string) : null;
      if (hitId !== hoveredRef.current) {
        hoveredRef.current = hitId;
        onHoverChange(hitId);
      }
    }
  });

  return null;
}
