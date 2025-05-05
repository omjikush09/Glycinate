import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function DeployedLink({ project }: { project: string }) {
	return (
		<div className="flex gap-4">
			Deployed Link-
			<Link
				className="text-white cursor-pointer inline"
				href={`https://${project}.glycinate.in`}
				target="_blank"
			>
				{`https://${project}.glycinate.in`}
				<SquareArrowOutUpRight />
			</Link>
		</div>
	);
}
