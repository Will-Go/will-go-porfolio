"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { PATH_WIDTH, STATIONS } from "./constants";

const ACCENT = "#0141ff";
const DASH_SPACING = 0.75;
const DASH_LENGTH = 0.45;
const FLOW_SPEED = 4; // units per second the pulse travels along the path

interface IDash {
	position: [number, number, number];
	rotationY: number;
	distance: number;
}

function buildDashes(): { dashes: IDash[]; total: number } {
	const dashes: IDash[] = [];
	let total = 0;
	for (let i = 0; i < STATIONS.length - 1; i++) {
		const a = STATIONS[i].position;
		const b = STATIONS[i + 1].position;
		const dx = b[0] - a[0];
		const dz = b[2] - a[2];
		const length = Math.hypot(dx, dz);
		const rotationY = -Math.atan2(dz, dx);
		const count = Math.floor(length / DASH_SPACING);
		for (let j = 1; j < count; j++) {
			const tt = j / count;
			dashes.push({
				position: [a[0] + dx * tt, 0.02, a[2] + dz * tt],
				rotationY,
				distance: total + length * tt,
			});
		}
		total += length;
	}
	return { dashes, total };
}

export function PathTrail() {
	const { dashes, total } = useMemo(buildDashes, []);
	const meshes = useRef<THREE.Mesh[]>([]);

	useFrame(({ clock }) => {
		const head = (clock.getElapsedTime() * FLOW_SPEED) % (total + 6);
		for (let i = 0; i < dashes.length; i++) {
			const mesh = meshes.current[i];
			if (!mesh) continue;
			const material = mesh.material as THREE.MeshBasicMaterial;
			// Distance behind the moving head -> brighter, fading out as it trails.
			let delta = head - dashes[i].distance;
			if (delta < 0) delta += total + 6;
			const pulse = delta < 4 ? 1 - delta / 4 : 0;
			material.opacity = 0.18 + pulse * 0.72;
		}
	});

	return (
		<group>
			{dashes.map((dash, i) => (
				<mesh
					key={dash.position.join(",")}
					ref={(el) => {
						if (el) meshes.current[i] = el;
					}}
					position={dash.position}
					rotation={[-Math.PI / 2, 0, dash.rotationY]}
				>
					<planeGeometry args={[DASH_LENGTH, PATH_WIDTH]} />
					<meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
				</mesh>
			))}
		</group>
	);
}
