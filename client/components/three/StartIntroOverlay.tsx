"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useIntroStore } from "@/stores/useIntroStore";

const COLS = 24;
const ROWS = 16;
const DISSOLVE_DURATION = 0.5;
const STAGGER_SPREAD = 0.9;
const BG_FADE_DELAY = 0.2;
const BG_FADE_DURATION = 0.45;

const TILE_SHADES = [
  "#0a0a0a",
  "#0e0e14",
  "#12121c",
  "#161628",
  "#101830",
  "#0a1838",
];

interface ITileCell {
  id: number;
  delay: number;
  shade: string;
}

export default function StartIntroOverlay() {
	const setIntroComplete = useIntroStore((s) => s.setIntroComplete);
	const [visible, setVisible] = useState(true);

  const tiles = useMemo<ITileCell[]>(() => {
    const centerCol = (COLS - 1) / 2;
    const centerRow = (ROWS - 1) / 2;
    const maxDist = Math.hypot(centerCol, centerRow);

    const cells: ITileCell[] = [];
    let id = 0;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const dist = Math.hypot(col - centerCol, row - centerRow);
        const normalized = dist / maxDist;
        const delay = normalized * STAGGER_SPREAD + Math.random() * 0.06;
        const shade = TILE_SHADES[(col + row * 2) % TILE_SHADES.length];

        cells.push({ id: id++, delay, shade });
      }
    }

    return cells;
  }, []);

  const totalDuration =
    STAGGER_SPREAD + DISSOLVE_DURATION + BG_FADE_DELAY + BG_FADE_DURATION;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      setIntroComplete(true);
    }, totalDuration * 1000 + 80);

    return () => window.clearTimeout(timer);
  }, [setIntroComplete, totalDuration]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-100 overflow-hidden bg-black pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: STAGGER_SPREAD + DISSOLVE_DURATION * 0.6 + BG_FADE_DELAY,
        duration: BG_FADE_DURATION,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div
        className="absolute inset-0 grid place-items-stretch"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            className="w-full h-full"
            style={{ backgroundColor: tile.shade }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: DISSOLVE_DURATION,
              delay: tile.delay,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
