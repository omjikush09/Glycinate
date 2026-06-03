import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/db/index";
import { eq } from "@repo/db/orm";
import { projectTable } from "@repo/db/schema";
import { ArrowUpRight, Folder, GitBranch, Globe, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { StatusBadge } from "@/components/ui/status-badge";

export default async function Dashboard() {
	const { userId } = await auth();
	if (!userId) {
		return (
			<EmptyState
				title="You're signed out"
				description="Sign in to view and manage your projects."
				ctaLabel="Sign in"
				ctaHref="/"
			/>
		);
	}

	let response;
	try {
		response = await db
			.select({ projectName: projectTable.name, gitUrl: projectTable.gitUrl })
			.from(projectTable)
			.where(eq(projectTable.userId, userId));
	} catch (error) {
		console.error(error);
		return (
			<EmptyState
				title="Something went wrong"
				description="We couldn't load your projects. Please try again in a moment."
				ctaLabel="Reload"
				ctaHref="/dashboard"
			/>
		);
	}

	const projects = response ?? [];

	return (
		<section className="py-12">
			<header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							Projects
						</h1>
						<StatusBadge tone="info">{projects.length} total</StatusBadge>
					</div>
					<p className="mt-2 max-w-xl text-sm text-muted-foreground">
						Everything you&apos;ve shipped, all in one place. Open any project
						to manage deployments, view logs, and tweak settings.
					</p>
				</div>
				<Button asChild variant="gradient" size="lg">
					<Link href="/new">
						<Plus className="h-4 w-4" />
						New project
					</Link>
				</Button>
			</header>

			{projects.length === 0 ? (
				<EmptyState
					title="No projects yet"
					description="Connect a Git repository and ship your first React app in under a minute."
					ctaLabel="Deploy your first project"
					ctaHref="/new"
				/>
			) : (
				<div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<Link
							key={project.projectName}
							href={`/dashboard/project/${project.projectName}`}
							className="group focus:outline-none"
						>
							<MagicCard className="h-44">
								<div className="flex h-full flex-col justify-between p-5">
									<div className="flex items-start justify-between">
										<span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
											<Folder className="h-5 w-5 text-primary" />
										</span>
										<ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
									</div>
									<div>
										<h3 className="truncate text-lg font-semibold tracking-tight">
											{project.projectName}
										</h3>
										<div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
											<GitBranch className="h-3.5 w-3.5" />
											<span className="truncate">{project.gitUrl}</span>
										</div>
										<div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
											<Globe className="h-3.5 w-3.5 text-cyan-400" />
											<span className="truncate font-mono">
												{project.projectName}.glycinate.in
											</span>
										</div>
									</div>
								</div>
							</MagicCard>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}

function EmptyState({
	title,
	description,
	ctaLabel,
	ctaHref,
}: {
	title: string;
	description: string;
	ctaLabel: string;
	ctaHref: string;
}) {
	return (
		<div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-card/40 p-14 text-center backdrop-blur-sm">
			<span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
				<Folder className="h-6 w-6 text-primary" />
			</span>
			<h2 className="mt-4 text-xl font-semibold tracking-tight">{title}</h2>
			<p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
			<Button asChild className="mt-6" variant="gradient" size="lg">
				<Link href={ctaHref}>{ctaLabel}</Link>
			</Button>
		</div>
	);
}
