import Project, { IncomingProject } from "@/interfaces/IProject";
import localProjects from "@/content/projects";

const GITHUB_PROJECTS_URL =
	"https://api.github.com/search/repositories?q=user%3AWill-Go%20topic%3Aporfolio&sort=updated&direction=desc";

export interface IProjectsResult {
	projects: Project[];
	hasFetchError: boolean;
}

function mapIncomingProject(item: IncomingProject): Project {
	const tech: string[] = [];
	const cat: string[] = [];

	item.topics.forEach((topic: string) => {
		if (topic.startsWith("c-")) {
			cat.push(topic.replace("c-", ""));
		} else if (topic.startsWith("t-")) {
			tech.push(topic.replace("t-", ""));
		}
	});

	return {
		name: item.name,
		description: item.description,
		categories: cat,
		technologies: tech,
		repoUrl: item.html_url,
		created_at: item.created_at,
	};
}

export async function getProjects(): Promise<IProjectsResult> {
	try {
		const res = await fetch(GITHUB_PROJECTS_URL);

		if (!res.ok) {
			return { projects: localProjects, hasFetchError: true };
		}

		const data = await res.json();
		const fetchedProjects = data.items.map(mapIncomingProject);
		const projects = [...localProjects, ...fetchedProjects].sort(
			(a, b) =>
				new Date(b.created_at ?? 0).getTime() -
				new Date(a.created_at ?? 0).getTime(),
		);

		return { projects, hasFetchError: false };
	} catch {
		return { projects: localProjects, hasFetchError: true };
	}
}
