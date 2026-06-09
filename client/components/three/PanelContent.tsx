"use client";

import type { ReactNode } from "react";
import {
  WelcomePanel,
  AboutPanel,
  SkillsPanel,
  EducationPanel,
  ExperiencePanel,
  ProjectsPanel,
} from "./content";

const panels: Record<string, ReactNode> = {
  welcome: <WelcomePanel />,
  about: <AboutPanel />,
  skills: <SkillsPanel />,
  education: <EducationPanel />,
  experience: <ExperiencePanel />,
  projects: <ProjectsPanel />,
};

export function PanelContent({ zone }: { zone: string }) {
  return (panels[zone] ?? null) as ReactNode;
}
