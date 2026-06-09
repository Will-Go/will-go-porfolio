"use client";

import { HALF_D, HALF_W, ROOM_D, ROOM_H, ROOM_W } from "./constants";

const WALL_COLOR = "#1e1e30";
const NEON_COLOR = "#0141ff";
const PILLAR_COLOR = "#0141ff";
const halfH = ROOM_H / 2;
const topH = ROOM_H - 0.15;
const gap = 0.8;

const CORNER_PILLARS: [number, number, number][] = [
	[-HALF_W + 0.1, halfH, -HALF_D + 0.1],
	[HALF_W - 0.1, halfH, -HALF_D + 0.1],
	[-HALF_W + 0.1, halfH, HALF_D - 0.1],
	[HALF_W - 0.1, halfH, HALF_D - 0.1],
];

const CEILING_LIGHTS: [number, number, number][] = [
	[-6, 4.98, -4],
	[6, 4.98, -4],
	[-6, 4.98, 4],
	[6, 4.98, 4],
];

interface INeonStrip {
	position: [number, number, number];
	rotationY: number;
	width: number;
	height: number;
}

const NEON_STRIPS: INeonStrip[] = [
	{ position: [0, topH, -HALF_D + 0.01], rotationY: 0, width: ROOM_W - gap, height: 0.06 },
	{ position: [0, topH, HALF_D - 0.01], rotationY: Math.PI, width: ROOM_W - gap, height: 0.06 },
	{ position: [-HALF_W + 0.01, topH, 0], rotationY: Math.PI / 2, width: ROOM_D - gap, height: 0.06 },
	{ position: [HALF_W - 0.01, topH, 0], rotationY: -Math.PI / 2, width: ROOM_D - gap, height: 0.06 },
	{ position: [0, 0.15, -HALF_D + 0.01], rotationY: 0, width: ROOM_W - gap, height: 0.04 },
	{ position: [0, 0.15, HALF_D - 0.01], rotationY: Math.PI, width: ROOM_W - gap, height: 0.04 },
	{ position: [-HALF_W + 0.01, 0.15, 0], rotationY: Math.PI / 2, width: ROOM_D - gap, height: 0.04 },
	{ position: [HALF_W - 0.01, 0.15, 0], rotationY: -Math.PI / 2, width: ROOM_D - gap, height: 0.04 },
];

function NeonStrip({ position, rotationY, width, height }: INeonStrip) {
	return (
		<mesh position={position} rotation-y={rotationY}>
			<planeGeometry args={[width, height]} />
			<meshBasicMaterial color={NEON_COLOR} transparent opacity={0.25} />
		</mesh>
	);
}

export function Room() {
	return (
		<group>
			<mesh rotation-x={-Math.PI / 2}>
				<planeGeometry args={[ROOM_W, ROOM_D]} />
				<meshStandardMaterial color="#2a2a3a" roughness={0.5} metalness={0.4} />
			</mesh>

			<gridHelper args={[ROOM_W, ROOM_W, 0x0141ff, 0x0141ff]}>
				<meshBasicMaterial attach="material" transparent opacity={0.12} />
			</gridHelper>

			<mesh position-y={ROOM_H} rotation-x={Math.PI / 2}>
				<planeGeometry args={[ROOM_W, ROOM_D]} />
				<meshStandardMaterial color="#202038" roughness={0.6} metalness={0.3} />
			</mesh>

			<mesh position={[0, halfH, -HALF_D]}>
				<planeGeometry args={[ROOM_W, ROOM_H]} />
				<meshStandardMaterial color={WALL_COLOR} roughness={0.5} metalness={0.2} />
			</mesh>
			<mesh position={[0, halfH, HALF_D]} rotation-y={Math.PI}>
				<planeGeometry args={[ROOM_W, ROOM_H]} />
				<meshStandardMaterial color={WALL_COLOR} roughness={0.5} metalness={0.2} />
			</mesh>
			<mesh position={[HALF_W, halfH, 0]} rotation-y={-Math.PI / 2}>
				<planeGeometry args={[ROOM_D, ROOM_H]} />
				<meshStandardMaterial color={WALL_COLOR} roughness={0.5} metalness={0.2} />
			</mesh>
			<mesh position={[-HALF_W, halfH, 0]} rotation-y={Math.PI / 2}>
				<planeGeometry args={[ROOM_D, ROOM_H]} />
				<meshStandardMaterial color={WALL_COLOR} roughness={0.5} metalness={0.2} />
			</mesh>

			{NEON_STRIPS.map((strip) => (
				<NeonStrip key={`${strip.position.join(",")}-${strip.rotationY}`} {...strip} />
			))}

			{CORNER_PILLARS.map((position) => (
				<mesh key={position.join(",")} position={position}>
					<boxGeometry args={[0.2, ROOM_H, 0.2]} />
					<meshStandardMaterial
						color={PILLAR_COLOR}
						emissive={PILLAR_COLOR}
						emissiveIntensity={0.7}
						roughness={0.3}
						metalness={0.5}
					/>
				</mesh>
			))}

			{CEILING_LIGHTS.map((position) => (
				<mesh key={position.join(",")} position={position} rotation-x={Math.PI / 2}>
					<planeGeometry args={[2, 0.8]} />
					<meshBasicMaterial color={NEON_COLOR} transparent opacity={0.5} />
				</mesh>
			))}
		</group>
	);
}
