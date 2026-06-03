import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";

export default function DeployedLink({ project }: { project: string }) {
	const url = `https://${project}.glycinate.in`;
	return (
		<Link
			href={url}
			target="_blank"
			rel="noreferrer"
			className="group inline-flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-primary/40 hover:bg-white/[0.05]"
		>
			<span className="flex items-center gap-3 truncate">
				<span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
					<Globe className="h-4 w-4 text-cyan-400" />
				</span>
				<span className="flex flex-col">
					<span className="text-xs uppercase tracking-wider text-muted-foreground">
						Deployed URL
					</span>
					<span className="truncate font-mono text-sm text-foreground">{url}</span>
				</span>
			</span>
			<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
		</Link>
	);
}
