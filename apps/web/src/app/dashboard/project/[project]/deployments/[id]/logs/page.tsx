import DeployMentStatus from "@/app/components/DeploymentStatus";

export default async function Logs({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<>
			<div className="text-white flex-1 flex items-center flex-col ">
				<div>Diployment Id -- {id}</div>
				<DeployMentStatus deploymentId={Number(id)} />
			</div>
		</>
	);
}
