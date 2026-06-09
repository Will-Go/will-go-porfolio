"use client";

import { useTranslations } from "next-intl";
import { Html } from "@react-three/drei";
import { cn } from "@/utils/cn";
import {
  FaUser,
  FaGithub,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import { WALL_SECTIONS, type IWallSection } from "./constants";

const SECTION_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  about: FaUser,
  projects: FaGithub,
  skills: FaCode,
  education: FaGraduationCap,
  experience: FaBriefcase,
};

function WallLabel({
  position,
  rotation,
  Icon,
  title,
  hovered,
  onClick,
}: {
  position: [number, number, number];
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  rotation: [number, number, number];
  hovered: boolean;
  onClick: () => void;
}) {
  return (
    <Html
      position={position}
      transform
      rotation={rotation}
      distanceFactor={6}
      zIndexRange={[1500, 1500]}
      style={{ pointerEvents: "auto" }}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border text-white text-sm font-medium cursor-pointer active:scale-95 transition-all duration-300 whitespace-nowrap",
          hovered
            ? "bg-accent-500/25 border-accent-500/60 scale-110 shadow-[0_0_20px_rgba(1,65,255,0.3)]"
            : "bg-black/50 border-accent-500/30 hover:bg-accent-500/20 hover:border-accent-500/50 hover:scale-105",
        )}
      >
        <Icon className="text-accent-400 text-base" />
        {title}
      </button>
    </Html>
  );
}

export function WallLabels({
  onSectionClick,
  hoveredSection,
}: {
  onSectionClick: (id: string) => void;
  hoveredSection: string | null;
}) {
  const t = useTranslations();
  return (
    <>
      {WALL_SECTIONS.map((section) => (
        <WallLabel
          key={section.id}
          position={section.position}
          rotation={section.rotation}
          Icon={SECTION_ICONS[section.id]}
          title={t(section.titleKey)}
          hovered={hoveredSection === section.id}
          onClick={() => onSectionClick(section.id)}
        />
      ))}
    </>
  );
}
