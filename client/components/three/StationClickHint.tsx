"use client";

import { motion } from "framer-motion";
import { Html } from "@react-three/drei";
import { ClickCursorIcon } from "./ClickCursorIcon";

interface IStationClickHintProps {
	visible: boolean;
	label: string;
}

export function StationClickHint({ visible, label }: IStationClickHintProps) {
	if (!visible) return null;

	return (
		<Html
			position={[0, 1.35, 0.85]}
			center
			distanceFactor={7}
			zIndexRange={[1350, 1350]}
			style={{ pointerEvents: "none" }}
		>
			<motion.div
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: [6, -2, 6] }}
				exit={{ opacity: 0, y: 6 }}
				transition={{
					opacity: { duration: 0.25 },
					y: { duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
				}}
				className="flex flex-col items-center gap-1.5 select-none"
			>
				<motion.div
					animate={{ scale: [1, 0.88, 1] }}
					transition={{
						duration: 1.2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="drop-shadow-[0_2px_8px_rgba(1,65,255,0.45)]"
				>
					<ClickCursorIcon />
				</motion.div>
				<span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-accent-500/35 text-white text-xs font-medium whitespace-nowrap shadow-[0_0_16px_rgba(1,65,255,0.2)]">
					{label}
				</span>
			</motion.div>
		</Html>
	);
}
