import { db } from "@repo/db/index";
import { deployMentTable, projectTable } from "@repo/db/schema";
import { eq } from "@repo/db/orm";
import { History, Hash, ArrowRight } from "lucide-react";
import Link from "next/link";

import DeployedLink from "@/app/components/DeployedLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function Deployments({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	const deployments = await db
		.select({
			DeploymentId: deployMentTable.id,
			projectName: projectTable.name,
		})
		.from(deployMentTable)
		.innerJoin(projectTable, eq(deployMentTable.projectId, projectTable.id))
		.where(eq(projectTable.name, project));

	return (
		<div className="space-y-5">
			<DeployedLink project={project} />

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle className="flex items-center gap-2">
								<History className="h-4 w-4 text-primary" />
								Deployments
							</CardTitle>
							<CardDescription>
								All builds for{" "}
								<span className="font-mono text-foreground/80">
									{deployments[0]?.projectName ?? project}
								</span>
							</CardDescription>
						</div>
						<span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground">
							{deployments.length} total
						</span>
					</div>
				</CardHeader>
				<CardContent>
					{deployments.length === 0 ? (
						<div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-muted-foreground">
							No deployments yet. Trigger one from the &quot;New project&quot;
							flow.
						</div>
					) : (
						<ul className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10">
							{deployments.map((deployment, idx) => (
								<li
									key={deployment.DeploymentId}
									className="group flex items-center justify-between gap-3 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
								>
									<div className="flex min-w-0 items-center gap-3">
										<span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-xs text-muted-foreground">
											<Hash className="h-3.5 w-3.5" />
										</span>
										<div className="min-w-0">
											<p className="truncate font-mono text-sm text-foreground">
												{deployment.DeploymentId}
											</p>
											<p className="text-xs text-muted-foreground">
												{idx === 0 ? "Latest deployment" : "Previous deployment"}
											</p>
										</div>
									</div>
									<Button asChild variant="outline" size="sm">
										<Link
											href={`/dashboard/project/${deployments[0]?.projectName}/deployments/${deployment.DeploymentId}/logs`}
										>
											View logs
											<ArrowRight className="h-3.5 w-3.5" />
										</Link>
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
