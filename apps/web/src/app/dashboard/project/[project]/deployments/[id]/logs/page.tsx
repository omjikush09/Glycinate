import { ArrowLeft, Hash } from "lucide-react";
import Link from "next/link";

import DeployMentStatus from "@/app/components/DeploymentStatus";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default async function Logs({
	params,
}: {
	params: Promise<{ id: string; project: string }>;
}) {
	const { id, project } = await params;
	return (
		<div className="space-y-5">
			<Link
				href={`/dashboard/project/${project}/deployments`}
				className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to deployments
			</Link>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle className="flex items-center gap-2">
								<Hash className="h-4 w-4 text-primary" />
								Deployment <span className="font-mono text-foreground">{id}</span>
							</CardTitle>
							<CardDescription>
								Live status and details for this build.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<DeployMentStatus deploymentId={Number(id)} project={project} />
				</CardContent>
			</Card>
		</div>
	);
}
