import { Folder } from "lucide-react";
import Link from "next/link";

import { ProjectTabs } from "@/app/components/ProjectTabs";
import { StatusBadge } from "@/components/ui/status-badge";

export default async function ProjectLayout({
	params,
	children,
}: {
	children: React.ReactNode;
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<section className="py-10">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
						<Folder className="h-5 w-5 text-primary" />
					</span>
					<div>
						<Link
							href="/dashboard"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							Projects
						</Link>
						<h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
							{project}
						</h1>
					</div>
				</div>

				<Link
					href={`https://${project}.glycinate.in`}
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:self-auto"
				>
					<StatusBadge tone="success" pulse>
						Live
					</StatusBadge>
					{project}.glycinate.in
				</Link>
			</div>

			<ProjectTabs project={project} />

			<div className="mt-6">{children}</div>
		</section>
	);
}
