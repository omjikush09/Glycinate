import DeployedLink from "@/app/components/DeployedLink";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default async function Project({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<>
			<div className=" flex text-slate-300 justify-center pt-8 flex-1">
				<div className="flex flex-col max-w-[600] ">
					<div className=" mb-10">project details--</div>
					<DeployedLink project={project} />
				</div>
			</div>
		</>
	);
}
