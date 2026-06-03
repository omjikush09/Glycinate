"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, LayoutGrid, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProjectTabs({ project }: { project: string }) {
	const pathname = usePathname();
	const base = `/dashboard/project/${project}`;

	const items = [
		{ label: "Overview", href: base, icon: LayoutGrid, exact: true },
		{
			label: "Deployments",
			href: `${base}/deployments`,
			icon: History,
			exact: false,
		},
		{
			label: "Settings",
			href: `${base}/settings`,
			icon: Settings,
			exact: false,
		},
	];

	return (
		<nav className="mt-6 flex items-center gap-1 border-b border-white/[0.08]">
			{items.map((item) => {
				const active = item.exact
					? pathname === item.href
					: pathname?.startsWith(item.href);
				return (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"relative inline-flex items-center gap-2 px-3 py-3 text-sm transition-colors",
							active
								? "text-foreground"
								: "text-muted-foreground hover:text-foreground"
						)}
					>
						<item.icon className="h-4 w-4" />
						{item.label}
						{active && (
							<span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-violet-500 via-primary to-cyan-400" />
						)}
					</Link>
				);
			})}
		</nav>
	);
}
