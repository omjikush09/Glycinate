import { Activity, GitBranch, Globe, Rocket } from "lucide-react";
import Link from "next/link";

import DeployedLink from "@/app/components/DeployedLink";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export default async function Project({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
			<Card className="lg:col-span-2">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle>Overview</CardTitle>
							<CardDescription>
								Your project at a glance. Open deployments to view build
								history.
							</CardDescription>
						</div>
						<StatusBadge tone="success" pulse>
							Live
						</StatusBadge>
					</div>
				</CardHeader>
				<CardContent>
					<DeployedLink project={project} />
					<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<MetricTile
							label="Last status"
							value="Deployed"
							icon={Activity}
							tone="success"
						/>
						<MetricTile
							label="Subdomain"
							value={`${project}.glycinate.in`}
							icon={Globe}
							tone="info"
						/>
						<MetricTile label="Default branch" value="main" icon={GitBranch} />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Quick actions</CardTitle>
					<CardDescription>Re-deploy or jump into history.</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Button asChild variant="gradient" size="lg">
						<Link href={`/dashboard/project/${project}/deployments`}>
							<Rocket className="h-4 w-4" />
							View deployments
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/new">
							<GitBranch className="h-4 w-4" />
							New deploy
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

function MetricTile({
	label,
	value,
	icon: Icon,
	tone,
}: {
	label: string;
	value: string;
	icon: React.ElementType;
	tone?: "success" | "info" | "neutral";
}) {
	const toneText =
		tone === "success"
			? "text-emerald-300"
			: tone === "info"
				? "text-cyan-300"
				: "text-foreground";
	return (
		<div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<Icon className="h-3.5 w-3.5" />
				{label}
			</div>
			<p className={`mt-2 truncate font-mono text-sm ${toneText}`}>{value}</p>
		</div>
	);
}
