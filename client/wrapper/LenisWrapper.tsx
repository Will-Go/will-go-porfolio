"use client";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { usePanelStore } from "@/stores/usePanelStore";
import { useViewModeStore } from "@/stores/useViewModeStore";
import "lenis/dist/lenis.css";

interface LenisWrapperProps {
	children: React.ReactNode;
}

function LenisWrapper({ children }: LenisWrapperProps) {
	const lenisRef = useRef<LenisRef>(null);
	const prefersReducedMotion = useReducedMotion();
	const is3D = useViewModeStore((state) => state.is3D);
	const expandedPanel = usePanelStore((state) => state.expandedPanel);
	const shouldStopLenis = is3D || expandedPanel !== null;

	useEffect(() => {
		if (prefersReducedMotion) return;

		function update(data: { timestamp: number }) {
			lenisRef.current?.lenis?.raf(data.timestamp);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, [prefersReducedMotion]);

	useEffect(() => {
		if (prefersReducedMotion) return;

		const syncLenis = () => {
			const lenis = lenisRef.current?.lenis;
			if (!lenis) return false;

			if (shouldStopLenis) {
				lenis.stop();
			} else {
				lenis.start();
			}

			return true;
		};

		if (syncLenis()) return;

		const frameId = requestAnimationFrame(() => {
			syncLenis();
		});

		return () => cancelAnimationFrame(frameId);
	}, [prefersReducedMotion, shouldStopLenis]);

	if (prefersReducedMotion) {
		return children;
	}

	return (
		<>
			<ReactLenis
				root
				ref={lenisRef}
				options={{
					autoRaf: false,
					lerp: 0.08,
					smoothWheel: true,
				}}
			/>
			{children}
		</>
	);
}

export default LenisWrapper;
