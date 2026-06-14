"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  BOUNDARY_RADIUS,
  PLAYER_RADIUS,
  PLAYER_EYE_HEIGHT,
  PLAYER_SPEED,
  WELCOME_ZONE,
  STATIONS,
  STATION_COLLIDER,
  getStationBoxColliders,
} from "./constants";
import { moveWithBoxCollisions } from "./collision";

const moveVec = new THREE.Vector3();
const forwardVec = new THREE.Vector3();
const rightVec = new THREE.Vector3();
const rayDir = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const STATION_COLLIDERS = getStationBoxColliders();

// Head-bob tuning. The bob runs on its own continuous time/phase so it stays
// smooth regardless of frame-rate, and its intensity eases in/out separately
// from the actual walking movement.
const BOB_FREQUENCY = 9; // oscillations speed (radians/sec scale)
const BOB_VERTICAL = 0.06; // peak vertical offset (meters)
const BOB_LATERAL = 0.035; // peak side-to-side sway (meters)
const BOB_RAMP = 6; // how fast the bob eases in when walking / out when idle

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
  // Logical (un-bobbed) player position — movement & collision act on this so
  // the bob offset never feeds back into the player's real position.
  const basePos = useRef(new THREE.Vector3());
  const bobPhase = useRef(0);
  const bobIntensity = useRef(0);
  const hitTargets = useRef<THREE.Mesh[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const expandedPanelRef = useRef(expandedPanel);
  expandedPanelRef.current = expandedPanel;

  // Create invisible hit targets over each station's computer table so the
  // center-ray can detect what the player is aiming at while pointer-locked.
  useEffect(() => {
    const targets = STATIONS.map((station) => {
      const geo = new THREE.BoxGeometry(
        STATION_COLLIDER.halfWidth * 2,
        STATION_COLLIDER.height,
        STATION_COLLIDER.halfDepth * 2,
      );
      const mat = new THREE.MeshBasicMaterial({ visible: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        station.position[0],
        STATION_COLLIDER.centerY,
        station.position[2],
      );
      mesh.userData.sectionId = station.id;
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
      WELCOME_ZONE.x,
      PLAYER_EYE_HEIGHT,
      WELCOME_ZONE.z + 4.5,
    );
    basePos.current.copy(camera.position);
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

    let nextX = basePos.current.x + moveVec.x;
    let nextZ = basePos.current.z + moveVec.z;

    // Circular boundary — re-project inside the ring so the player can't wander off.
    const maxR = BOUNDARY_RADIUS - PLAYER_RADIUS;
    const distSq = nextX * nextX + nextZ * nextZ;
    if (distSq > maxR * maxR) {
      const dist = Math.sqrt(distSq);
      nextX = (nextX / dist) * maxR;
      nextZ = (nextZ / dist) * maxR;
    }

    ({ x: nextX, z: nextZ } = moveWithBoxCollisions(
      basePos.current.x,
      basePos.current.z,
      nextX,
      nextZ,
      PLAYER_RADIUS,
      STATION_COLLIDERS,
    ));

    basePos.current.x = nextX;
    basePos.current.z = nextZ;
    basePos.current.y = PLAYER_EYE_HEIGHT;

    // Head bob — runs on its own smooth time/phase, separate from the walking
    // movement. Intensity eases toward 1 while moving and back to 0 when idle.
    const isMoving = f !== 0 || s !== 0;
    const target = isMoving ? 1 : 0;
    bobIntensity.current +=
      (target - bobIntensity.current) * Math.min(1, dt * BOB_RAMP);
    // Only advance the phase while there's meaningful intensity, and settle the
    // phase back to a neutral 0 once the bob has faded out.
    if (bobIntensity.current > 0.001) {
      bobPhase.current += dt * BOB_FREQUENCY;
    } else {
      bobPhase.current = 0;
    }
    const bobY = Math.sin(bobPhase.current) * BOB_VERTICAL * bobIntensity.current;
    // Lateral sway is half-frequency so it sways once per two vertical bobs.
    const bobSide =
      Math.cos(bobPhase.current * 0.5) * BOB_LATERAL * bobIntensity.current;

    camera.position.x = basePos.current.x + rightVec.x * bobSide;
    camera.position.z = basePos.current.z + rightVec.z * bobSide;
    camera.position.y = PLAYER_EYE_HEIGHT + bobY;

    // Welcome zone detection — within radius AND facing the sign
    const dx = basePos.current.x - WELCOME_ZONE.x;
    const dz = basePos.current.z - WELCOME_ZONE.z;
    const inRadius = dx * dx + dz * dz < WELCOME_ZONE.r * WELCOME_ZONE.r;
    const toWelcomeX = WELCOME_ZONE.x - basePos.current.x;
    const toWelcomeZ = WELCOME_ZONE.z - basePos.current.z;
    const toWelcomeLen = Math.sqrt(
      toWelcomeX * toWelcomeX + toWelcomeZ * toWelcomeZ,
    );
    const facingWelcome =
      toWelcomeLen > 0.001 &&
      forwardVec.x * (toWelcomeX / toWelcomeLen) +
        forwardVec.z * (toWelcomeZ / toWelcomeLen) >
        0.3;
    const nowInWelcome = inRadius && facingWelcome;
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
