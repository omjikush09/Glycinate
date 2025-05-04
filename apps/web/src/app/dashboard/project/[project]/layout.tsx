import Link from "next/link";

export default async function NewLayout({
	params,
	children,
}: {
	children: React.ReactNode;
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<>
			<div className="flex gap-4 px-4 py-2">
				<Link className="text-white" href={`/dashboard/project/${project}`}>
					Project
				</Link>

				<Link
					className="text-white"
					href={`/dashboard/project/${project}/deployments`}
				>
					Deployments
				</Link>
				<Link
					className="text-white"
					href={`/dashboard/project/${project}/settings`}
				>
					Settings
				</Link>
			</div>
			{children}
		</>
	);
}
