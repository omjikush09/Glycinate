import DeployMentStatus from "@/app/components/DeploymentStatus";

export default async function Logs({
	params,
}: {
	params: Promise<{ id: string; project: string }>;
}) {
	const { id, project } = await params;
	return (
		<>
			<div className="text-white flex-1 flex items-center flex-col mt-4 ">
				<div>Diployment Id -- {id}</div>
				<DeployMentStatus deploymentId={Number(id)} project={project} />
			</div>
		</>
	);
}
