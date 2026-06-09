import * as THREE from "three";
import { ROOM_W, ROOM_D, ROOM_H, HALF_W, HALF_D } from "./constants";

export function addRoomToScene(scene: THREE.Scene) {
  const objects: THREE.Object3D[] = [];
  const add = (obj: THREE.Object3D) => {
    scene.add(obj);
    objects.push(obj);
  };

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x1e1e30,
    roughness: 0.5,
    metalness: 0.2,
  });
  const neonMat = new THREE.MeshBasicMaterial({
    color: 0x0141ff,
    transparent: true,
    opacity: 0.25,
  });
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x0141ff,
    emissive: 0x0141ff,
    emissiveIntensity: 0.7,
    roughness: 0.3,
    metalness: 0.5,
  });
  const ceilLightMat = new THREE.MeshBasicMaterial({
    color: 0x0141ff,
    transparent: true,
    opacity: 0.5,
  });

  add(
    new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_W, ROOM_D),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a3a,
        roughness: 0.5,
        metalness: 0.4,
      }),
    ),
  );
  objects[objects.length - 1].rotation.x = -Math.PI / 2;

  const grid = new THREE.GridHelper(ROOM_W, ROOM_W, 0x0141ff, 0x0141ff);
  (
    grid.material as THREE.Material & { transparent: boolean; opacity: number }
  ).transparent = true;
  (
    grid.material as THREE.Material & { transparent: boolean; opacity: number }
  ).opacity = 0.12;
  add(grid);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_W, ROOM_D),
    new THREE.MeshStandardMaterial({
      color: 0x202038,
      roughness: 0.6,
      metalness: 0.3,
    }),
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_H;
  add(ceiling);

  const halfH = ROOM_H / 2;
  const n = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
  n.position.set(0, halfH, -HALF_D);
  add(n);
  const s = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
  s.position.set(0, halfH, HALF_D);
  s.rotation.y = Math.PI;
  add(s);
  const e = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
  e.position.set(HALF_W, halfH, 0);
  e.rotation.y = -Math.PI / 2;
  add(e);
  const w = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
  w.position.set(-HALF_W, halfH, 0);
  w.rotation.y = Math.PI / 2;
  add(w);

  const topH = ROOM_H - 0.15;
  const gap = 0.8;
  (
    [
      [0, topH, -HALF_D + 0.01, 0, new THREE.PlaneGeometry(ROOM_W - gap, 0.06)],
      [
        0,
        topH,
        HALF_D - 0.01,
        Math.PI,
        new THREE.PlaneGeometry(ROOM_W - gap, 0.06),
      ],
      [
        -HALF_W + 0.01,
        topH,
        0,
        Math.PI / 2,
        new THREE.PlaneGeometry(ROOM_D - gap, 0.06),
      ],
      [
        HALF_W - 0.01,
        topH,
        0,
        -Math.PI / 2,
        new THREE.PlaneGeometry(ROOM_D - gap, 0.06),
      ],
      [0, 0.15, -HALF_D + 0.01, 0, new THREE.PlaneGeometry(ROOM_W - gap, 0.04)],
      [
        0,
        0.15,
        HALF_D - 0.01,
        Math.PI,
        new THREE.PlaneGeometry(ROOM_W - gap, 0.04),
      ],
      [
        -HALF_W + 0.01,
        0.15,
        0,
        Math.PI / 2,
        new THREE.PlaneGeometry(ROOM_D - gap, 0.04),
      ],
      [
        HALF_W - 0.01,
        0.15,
        0,
        -Math.PI / 2,
        new THREE.PlaneGeometry(ROOM_D - gap, 0.04),
      ],
    ] as [number, number, number, number, THREE.BufferGeometry][]
  ).forEach(([x, y, z, ry, geo]) => {
    const m = new THREE.Mesh(geo, neonMat);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    add(m);
  });

  (
    [
      [-HALF_W + 0.1, halfH, -HALF_D + 0.1],
      [HALF_W - 0.1, halfH, -HALF_D + 0.1],
      [-HALF_W + 0.1, halfH, HALF_D - 0.1],
      [HALF_W - 0.1, halfH, HALF_D - 0.1],
    ] as [number, number, number][]
  ).forEach(([x, y, z]) => {
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, ROOM_H, 0.2),
      pillarMat,
    );
    p.position.set(x, y, z);
    add(p);
  });

  (
    [
      [-6, 4.98, -4],
      [6, 4.98, -4],
      [-6, 4.98, 4],
      [6, 4.98, 4],
    ] as [number, number, number][]
  ).forEach(([x, y, z]) => {
    const l = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.8), ceilLightMat);
    l.rotation.x = Math.PI / 2;
    l.position.set(x, y, z);
    add(l);
  });

  return () => {
    for (const obj of objects) {
      scene.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mat = obj.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    }
  };
}
