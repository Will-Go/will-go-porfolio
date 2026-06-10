"use client";

import { motion } from "framer-motion";

interface IClickCursorIconProps {
	className?: string;
}

export function ClickCursorIcon({ className }: IClickCursorIconProps) {
	return (
		<svg
			className={className}
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M8.5 4.5L8.5 24.5L13.5 19.5L17.5 27.5L20.5 26L16.5 18L23.5 18L8.5 4.5Z"
				fill="white"
				stroke="#0141ff"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
			<motion.circle
				cx="22"
				cy="22"
				r="4"
				stroke="#0141ff"
				strokeWidth="1.5"
				fill="none"
				initial={{ opacity: 0.8, scale: 0.6 }}
				animate={{ opacity: 0, scale: 1.6 }}
				transition={{
					duration: 1.4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeOut",
				}}
				style={{ transformOrigin: "22px 22px" }}
			/>
		</svg>
	);
}
