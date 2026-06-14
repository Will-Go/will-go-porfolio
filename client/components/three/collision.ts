import type { IStationBoxCollider } from "./constants";

export function resolveCircleBoxCollision(
  px: number,
  pz: number,
  radius: number,
  collider: IStationBoxCollider,
): { x: number; z: number } {
  const { centerX: cx, centerZ: cz, halfWidth: hw, halfDepth: hd } = collider;

  const closestX = Math.max(cx - hw, Math.min(px, cx + hw));
  const closestZ = Math.max(cz - hd, Math.min(pz, cz + hd));

  const dx = px - closestX;
  const dz = pz - closestZ;
  const distSq = dx * dx + dz * dz;

  if (distSq >= radius * radius) {
    return { x: px, z: pz };
  }

  if (distSq === 0) {
    const overlapLeft = px - (cx - hw);
    const overlapRight = cx + hw - px;
    const overlapTop = pz - (cz - hd);
    const overlapBottom = cz + hd - pz;
    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom,
    );

    if (minOverlap === overlapLeft) return { x: cx - hw - radius, z: pz };
    if (minOverlap === overlapRight) return { x: cx + hw + radius, z: pz };
    if (minOverlap === overlapTop) return { x: px, z: cz - hd - radius };
    return { x: px, z: cz + hd + radius };
  }

  const dist = Math.sqrt(distSq);
  const overlap = radius - dist;
  return {
    x: px + (dx / dist) * overlap,
    z: pz + (dz / dist) * overlap,
  };
}

/** Axis-separated resolution so the player slides along desk edges. */
export function moveWithBoxCollisions(
  oldX: number,
  oldZ: number,
  newX: number,
  newZ: number,
  radius: number,
  colliders: IStationBoxCollider[],
): { x: number; z: number } {
  let x = newX;
  let z = oldZ;
  for (const collider of colliders) {
    ({ x, z } = resolveCircleBoxCollision(x, z, radius, collider));
  }

  const resolvedX = x;
  x = oldX;
  z = newZ;
  for (const collider of colliders) {
    ({ x, z } = resolveCircleBoxCollision(x, z, radius, collider));
  }

  x = resolvedX;
  for (const collider of colliders) {
    ({ x, z } = resolveCircleBoxCollision(x, z, radius, collider));
  }

  return { x, z };
}
