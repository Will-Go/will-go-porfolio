"use client";

import {
  WelcomePanel,
  AboutPanel,
  SkillsPanel,
  EducationPanel,
  ExperiencePanel,
  ProjectsPanel,
} from "./content";
import { PanelHeadAnchor } from "./PanelHeadAnchor";

interface IPanelContentProps {
  zone: string;
  scrollContainer?: HTMLElement | null;
}

export function PanelContent({ zone, scrollContainer }: IPanelContentProps) {
  switch (zone) {
    case "welcome":
      return <WelcomePanel />;
    case "about":
      return (
        <PanelHeadAnchor zone="about">
          <AboutPanel />
        </PanelHeadAnchor>
      );
    case "skills":
      return <SkillsPanel />;
    case "education":
      return (
        <PanelHeadAnchor zone="education">
          <EducationPanel />
        </PanelHeadAnchor>
      );
    case "experience":
      return <ExperiencePanel scrollContainer={scrollContainer} />;
    case "projects":
      return <ProjectsPanel />;
    default:
      return null;
  }
}
