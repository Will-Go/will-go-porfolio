"use client";

import { useState, useCallback, Suspense, useEffect, useMemo } from "react";
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
import { usePanelStore } from "@/stores/usePanelStore";
import { useStationStore } from "@/stores/useStationStore";

const CAMERA_SETTINGS = {
  position: [0, EYE, 0] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
  fov: 75,
  near: 0.1,
  far: 100,
};

const CANVAS_DPR: [number, number] = [1, 1.5];

const TV_PANEL_CLOSED = "inset(50% 0% 50% 0%)";
const TV_PANEL_OPEN = "inset(0% 0% 0% 0%)";

const TV_PANEL_TRANSITION = {
  duration: 0.55,
  ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

const TV_PANEL_EXIT_TRANSITION = {
  duration: 0.45,
  ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

export default function ThreeExperience() {
  const t = useTranslations("threeExperience");
  const tRoot = useTranslations();
  const [showWelcome, setShowWelcome] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const expandedPanel = usePanelStore((s) => s.expandedPanel);
  const openPanel = usePanelStore((s) => s.openPanel);
  const closePanel = usePanelStore((s) => s.closePanel);
  const visited = useStationStore((s) => s.visited);
  const nextStationId = useStationStore((s) => s.nextStationId);
  const markVisited = useStationStore((s) => s.markVisited);
  const visitedStationIds = useMemo(() => new Set(visited), [visited]);

  const onWelcomeZoneChange = useCallback(
    (inside: boolean) => setShowWelcome(inside),
    [],
  );
  const onLockChange = useCallback((l: boolean) => setLocked(l), []);
  const onSectionClick = useCallback(
    (id: string) => {
      document.exitPointerLock();
      markVisited(id);
      openPanel(id);
    },
    [markVisited, openPanel],
  );
  const onWelcomeSignClick = useCallback(() => {
    document.exitPointerLock();
    markVisited("welcome");
    openPanel("welcome");
  }, [markVisited, openPanel]);
  const onHoverChange = useCallback(
    (id: string | null) => setHoveredSection(id),
    [],
  );

  const panelOpen = expandedPanel !== null;

  useEffect(() => {
    if (!panelOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen, closePanel]);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 30 }}>
        <Canvas
          camera={CAMERA_SETTINGS}
          style={{ width: "100%", height: "100%" }}
          dpr={CANVAS_DPR}
          performance={{ min: 0.5 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
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
                visited={visitedStationIds.has(station.id)}
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

      {/* Panels — fullscreen TV wipe: center → edges on open, edges → center on close */}
      <AnimatePresence mode="wait">
        {panelOpen && expandedPanel && (
          <motion.div
            key={expandedPanel}
            initial={{ clipPath: TV_PANEL_CLOSED }}
            animate={{
              clipPath: TV_PANEL_OPEN,
              transition: TV_PANEL_TRANSITION,
            }}
            exit={{
              clipPath: TV_PANEL_CLOSED,
              transition: TV_PANEL_EXIT_TRANSITION,
            }}
            className={cn(
              "fixed inset-0 z-40 bg-black text-white",
              "will-change-[clip-path]",
            )}
          >
            <div className="absolute inset-0 overflow-y-auto overscroll-contain">
              <div className="relative flex min-h-dvh w-full flex-col px-6 py-16 sm:px-12 md:px-16 lg:px-24">
                <button
                  type="button"
                  onClick={closePanel}
                  className="fixed top-6 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 text-gray-400 transition-all duration-200 hover:bg-white/20 hover:text-white sm:top-8 sm:right-8"
                  aria-label="Close"
                >
                  <FaTimes className="text-sm" />
                </button>
                <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
                  <PanelContent zone={expandedPanel} />
                </div>
              </div>
            </div>
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
