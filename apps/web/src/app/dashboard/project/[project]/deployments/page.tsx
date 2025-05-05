import { db } from "@repo/db/index";
import { deployMentTable, projectTable } from "@repo/db/schema";
import { eq } from "@repo/db/orm";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import DeployedLink from "@/app/components/DeployedLink";

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
		<div className="flex-1 flex items-center flex-col text-zinc-400 gap-2 mt-8">
			Deployments of project- {deployments[0]?.projectName}
			<DeployedLink project={project} />
			<div className="p-4 w-full ">
				{deployments.map((deployment) => {
					return (
						<div
							className="w-1/2 max-w-[800] shadow-sm shadow-amber-800/50 m-auto py-4 px-8 rounded-sm bg-linear-to-r from-black to-gray-900 "
							key={deployment?.DeploymentId}
						>
							<div className="flex justify-between">
								<h1>Deployment ID - {deployment.DeploymentId}</h1>
								<Link
									href={`/dashboard/project/${deployments[0]?.projectName}/deployments/${deployment?.DeploymentId}/logs`}
								>
									<h1 className="cursor-pointer px-8 py-2 bg-amber-800 rounded ">
										Logs
									</h1>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
