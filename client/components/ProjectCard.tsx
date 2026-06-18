"use client";

import Card from "./Card";
import Link from "next/link";
import TextDisplayer from "./TextDisplayer";
import { type MotionProps } from "framer-motion";
import { formatDate } from "@/utils/dateFormatter";
import type Project from "@/interfaces/IProject";
import { firstLetterCap } from "@/utils/firstLetterCap";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/utils/cn";

import {
	FaGithub,
	FaExternalLinkAlt,
	FaCalendarAlt,
	FaCode,
	FaTags,
} from "react-icons/fa";

export interface ProjectCardProps extends Project, MotionProps {
	index: number;
	isActive?: boolean;
}

export default function ProjectCard({
	index,
	isActive = false,
	name,
	description,
	categories,
	technologies,
	repoUrl,
	url,
	created_at,
	...motionProps
}: Readonly<ProjectCardProps>) {
	const t = useTranslations();
	const locale = useLocale();
	const projectNumber = String(index + 1).padStart(2, "0");

	const titleLink = repoUrl ? (
		<Link
			href={repoUrl}
			target="_blank"
			className="group/link inline-flex items-start gap-2.5 transition-colors duration-300 hover:text-accent-300"
		>
			<FaGithub className="mt-1 shrink-0 text-accent-500" />
			<span className="line-clamp-2 text-lg font-bold tracking-tight text-gray-900 group-hover/link:text-accent-500 dark:text-primary-100 dark:group-hover/link:text-accent-300">
				{name}
			</span>
			<FaExternalLinkAlt className="mt-1.5 shrink-0 text-xs opacity-50 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
		</Link>
	) : url ? (
		<Link
			href={url}
			target="_blank"
			className="group/link inline-flex items-start gap-2.5 transition-colors duration-300 hover:text-accent-300"
		>
			<span className="line-clamp-2 text-lg font-bold tracking-tight text-gray-900 group-hover/link:text-accent-500 dark:text-primary-100 dark:group-hover/link:text-accent-300">
				{name}
			</span>
			<FaExternalLinkAlt className="mt-1.5 shrink-0 text-xs opacity-50 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
		</Link>
	) : (
		<h2 className="line-clamp-2 text-lg font-bold tracking-tight text-gray-900 dark:text-primary-100">
			{name}
		</h2>
	);

	return (
		<Card
			className={cn(
				"group relative flex h-full min-h-[440px] w-full flex-col overflow-hidden border transition-all duration-500",
				isActive
					? "border-accent-500/50 bg-white shadow-[0_24px_60px_-20px_rgba(1,65,255,0.35)] dark:border-accent-500/40 dark:bg-primary-900/90 dark:shadow-[0_24px_60px_-20px_rgba(1,65,255,0.25)]"
					: "border-gray-200/80 bg-white/95 hover:border-accent-500/30 dark:border-primary-700/40 dark:bg-primary-900/70",
			)}
			{...motionProps}
		>
			<div
				className={cn(
					"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
					isActive && "opacity-100",
				)}
			>
				<div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent-500/15 blur-3xl" />
				<div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl" />
			</div>

			<div className="relative flex h-full flex-col p-6 sm:p-7">
				<div className="mb-5 flex items-start justify-between gap-3">
					<div className="min-w-0 flex-1 space-y-3">{titleLink}</div>
					<span
						className={cn(
							"shrink-0 font-mono text-xs tracking-[0.25em] transition-colors duration-300",
							isActive
								? "text-accent-500"
								: "text-gray-300 dark:text-primary-600",
						)}
					>
						{projectNumber}
					</span>
				</div>

				{created_at && (
					<div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-primary-400">
						<FaCalendarAlt className="shrink-0 text-accent-500" />
						<span>
							{t("projects.projectCard.created")}{" "}
							{formatDate(created_at, locale)}
						</span>
					</div>
				)}

				<div className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-primary-300">
					<TextDisplayer text={description} numClamp={isActive ? 4 : 3} />
				</div>

				<div className="mt-auto space-y-4">
					{categories.length > 0 && (
						<div className="space-y-2.5">
							<div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-primary-200">
								<FaTags className="text-accent-500" />
								<span>
									{categories.length === 1
										? t("projects.projectCard.category")
										: t("projects.projectCard.categories")}
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{categories.map((category, i) => (
									<span
										key={i}
										className="inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50/90 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors duration-300 dark:border-blue-700/50 dark:bg-blue-950/40 dark:text-blue-200"
									>
										{firstLetterCap(category)}
									</span>
								))}
							</div>
						</div>
					)}

					{technologies.length > 0 && (
						<div className="space-y-2.5">
							<div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-primary-200">
								<FaCode className="text-accent-500" />
								<span>
									{technologies.length === 1
										? t("projects.projectCard.technology")
										: t("projects.projectCard.technologies")}
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{technologies.slice(0, isActive ? 8 : 5).map((technology, i) => (
									<span
										key={i}
										className="inline-flex items-center rounded-full border border-gray-200/80 bg-gray-50/90 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors duration-300 dark:border-primary-700/50 dark:bg-primary-950/50 dark:text-primary-200"
									>
										{firstLetterCap(technology)}
									</span>
								))}
								{!isActive && technologies.length > 5 && (
									<span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-gray-400 dark:text-primary-500">
										+{technologies.length - 5}
									</span>
								)}
							</div>
						</div>
					)}

					<div
						className={cn(
							"h-0.5 w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-accent-500 to-accent-600 transition-transform duration-500",
							isActive ? "scale-x-100" : "group-hover:scale-x-100",
						)}
					/>
				</div>
			</div>
		</Card>
	);
}
