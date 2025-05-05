import { Separator } from "@/components/ui/separator";
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
			<div className="flex gap-4 px-4 py-2 h-10">
				<Link className="text-slate-300" href={`/dashboard/project/${project}`}>
					Project
				</Link>
				<Separator orientation="vertical" className="bg-blue-900" />
				<Link
					className="text-slate-300"
					href={`/dashboard/project/${project}/deployments`}
				>
					Deployments
				</Link>
				<Separator orientation="vertical" className="bg-blue-900" />

				<Link
					className="text-slate-300"
					href={`/dashboard/project/${project}/settings`}
				>
					Settings
				</Link>
			</div>
			<Separator className="bg-blue-950" />
			{children}
		</>
	);
}
