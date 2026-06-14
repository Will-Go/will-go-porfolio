"use client";

import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { FaTimes } from "react-icons/fa";
import { EYE, STATIONS } from "./constants";
import { Room } from "./Room";
import { Station } from "./Station";
import { PathTrail } from "./PathTrail";
import Player from "./Player";
import { PanelContent } from "./PanelContent";
import FloatingHeadOverlay from "./FloatingHeadOverlay";
import { useStationStore } from "@/stores/useStationStore";

export default function ThreeExperience() {
  const t = useTranslations("threeExperience");
  const tRoot = useTranslations();
  const [showWelcome, setShowWelcome] = useState(false);
  const [locked, setLocked] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const visited = useStationStore((s) => s.visited);
  const nextStationId = useStationStore((s) => s.nextStationId);
  const markVisited = useStationStore((s) => s.markVisited);

  const onWelcomeZoneChange = useCallback(
    (inside: boolean) => setShowWelcome(inside),
    [],
  );
  const onLockChange = useCallback((l: boolean) => setLocked(l), []);
  const onSectionClick = useCallback(
    (id: string) => {
      document.exitPointerLock();
      markVisited(id);
      setExpandedPanel(id);
    },
    [markVisited],
  );
  const onWelcomeSignClick = useCallback(() => {
    document.exitPointerLock();
    markVisited("welcome");
    setExpandedPanel("welcome");
  }, [markVisited]);
  const closePanel = useCallback(() => setExpandedPanel(null), []);
  const onHoverChange = useCallback(
    (id: string | null) => setHoveredSection(id),
    [],
  );

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 30 }}>
        <Canvas
          camera={{
            position: [0, EYE, 0],
            rotation: [0, 0, 0],
            fov: 75,
            near: 0.1,
            far: 100,
          }}
          style={{ width: "100%", height: "100%" }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#000"]} />
            <fog attach="fog" args={["#0a0a18", 20, 52]} />
            <ambientLight intensity={0.7} color="#ffffff" />
            <hemisphereLight
              color="#3a3a6a"
              groundColor="#0a0a1a"
              intensity={0.6}
            />
            <directionalLight
              position={[10, 18, 8]}
              intensity={1.1}
              color="#ffffff"
            />
            <pointLight
              position={[0, 6, 8]}
              intensity={1.2}
              color="#0141ff"
              distance={28}
            />
            <pointLight
              position={[0, 6, -10]}
              intensity={1.2}
              color="#8b5cf6"
              distance={28}
            />
            <Room />
            <PathTrail />

            {STATIONS.map((station) => (
              <Station
                key={station.id}
                station={station}
                title={tRoot(station.titleKey)}
                hovered={hoveredSection === station.id}
                visited={visited.includes(station.id)}
                isNext={nextStationId === station.id}
                panelOpen={expandedPanel !== null}
                onClick={() => onSectionClick(station.id)}
              />
            ))}
            <Player
              onWelcomeZoneChange={onWelcomeZoneChange}
              onLockChange={onLockChange}
              onSectionClick={onSectionClick}
              onHoverChange={onHoverChange}
              expandedPanel={expandedPanel}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Crosshair (visible when pointer is locked) */}
      {locked && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <div
            className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              hoveredSection
                ? "border-accent-400 bg-accent-500/15 scale-125"
                : "border-white/40",
            )}
          >
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                hoveredSection ? "bg-accent-400" : "bg-white/60",
              )}
            />
          </div>
        </div>
      )}

      {/* Expanded panel — TV-like open/close from vertical center */}
      <AnimatePresence>
        {expandedPanel && (
          <motion.div
            initial={{
              clipPath: "inset(50% 0% 50% 0%)",
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              scale: 1,
              transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
            }}
            exit={{
              clipPath: "inset(50% 0% 50% 0%)",
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
            }}
            className={cn(
              "fixed z-40",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "max-w-[440px] w-[90vw] max-h-[70vh] overflow-y-auto",
              "rounded-2xl border border-accent-500/20 bg-black/40 backdrop-blur-xl p-6",
              "shadow-[0_0_40px_rgba(1,65,255,0.08)]",
              "text-white",
            )}
          >
            <button
              type="button"
              onClick={closePanel}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>
            <PanelContent zone={expandedPanel} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls hint (only when no panel is open) */}
      {!locked && !expandedPanel && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-accent-500/20 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px]">
                Click
              </kbd>
              {t("clickToLook")}
            </span>
            <span className="w-px h-3 bg-accent-500/20" />
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px]">
                WASD
              </kbd>
              {t("wasdToMove")}
            </span>
            <span className="w-px h-3 bg-accent-500/20" />
            <span className="text-[10px] text-gray-500">
              {t("clickPanelsToExplore")}
            </span>
          </div>
        </div>
      )}

      {/* ESC hint when locked */}
      {locked && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-accent-500/10 text-[10px] text-gray-400">
            {t("press")}{" "}
            <kbd className="px-1 py-0.5 rounded bg-accent-500/10 border border-accent-500/20 text-accent-400">
              ESC
            </kbd>{" "}
            {t("releaseCursor")}
          </div>
        </div>
      )}

      <FloatingHeadOverlay
        showWelcome={showWelcome && !expandedPanel}
        locked={locked}
      />
    </>
  );
}
