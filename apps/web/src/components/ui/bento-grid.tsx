import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BentoGrid({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				className
			)}
		>
			{children}
		</div>
	);
}

interface BentoCardProps {
	name: string;
	className?: string;
	background?: React.ReactNode;
	Icon: React.ElementType;
	description: string;
	href?: string;
	cta?: string;
}

export function BentoCard({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: BentoCardProps) {
	return (
		<div
			className={cn(
				"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
				"bg-card border border-white/10",
				"[box-shadow:0_-20px_80px_-20px_#a78bfa20_inset]",
				"transition-all duration-300 hover:border-primary/40",
				className
			)}
		>
			<div className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent_0%,black_25%,black_75%,transparent_100%)]">
				{background}
			</div>

			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
				<Icon className="h-10 w-10 origin-left text-primary transition-all duration-300 ease-in-out group-hover:scale-90" />
				<h3 className="text-xl font-semibold text-foreground">{name}</h3>
				<p className="max-w-lg text-sm text-muted-foreground">{description}</p>
			</div>

			{cta && href ? (
				<div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
					<Button
						variant="ghost"
						asChild
						size="sm"
						className="pointer-events-auto"
					>
						<a href={href}>
							{cta}
							<ArrowRight className="ms-2 h-4 w-4" />
						</a>
					</Button>
				</div>
			) : null}

			<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[.02]" />
		</div>
	);
}
