import Link from "next/link";

export default async function Project({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<>
			<div className="p-4 flex gap-6">
				<div className="text-white ">project details--</div>
				<Link
					className="text-white cursor-pointer"
					href={`https://${project}.glycinate.in`}
					target="_blank"
				>
					{" "}
					Open Project{" "}
				</Link>
			</div>
		</>
	);
}
