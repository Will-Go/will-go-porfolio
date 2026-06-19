"use client";

import {
	WelcomePanel,
	AboutPanel,
	SkillsPanel,
	EducationPanel,
	ExperiencePanel,
	ProjectsPanel,
} from "./content";

interface IPanelContentProps {
	zone: string;
	scrollContainer?: HTMLElement | null;
}

export function PanelContent({ zone, scrollContainer }: IPanelContentProps) {
	switch (zone) {
		case "welcome":
			return <WelcomePanel />;
		case "about":
			return <AboutPanel />;
		case "skills":
			return <SkillsPanel />;
		case "education":
			return <EducationPanel />;
		case "experience":
			return <ExperiencePanel scrollContainer={scrollContainer} />;
		case "projects":
			return <ProjectsPanel />;
		default:
			return null;
	}
}
