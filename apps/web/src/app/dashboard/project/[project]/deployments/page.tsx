import { db } from "@repo/db/index";
import { deployMentTable, projectTable } from "@repo/db/schema";
import { eq } from "@repo/db/orm";
import Link from "next/link";

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
		<div className="flex-1 flex items-center flex-col text-white gap-2">
			Deployments of project {deployments[0]?.projectName}
			<div className="text-white p-4">
				{deployments.map((deployment) => {
					return (
						<Link
                        href={`/dashboard/project/${deployments[0]?.projectName}/deployments/${deployment?.DeploymentId}/logs`}
							className="text-white border rounded-2xl cursor-pointer px-10 py-2 bg-blue-600"
							key={deployment?.DeploymentId}
						>
							{deployment.DeploymentId}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
