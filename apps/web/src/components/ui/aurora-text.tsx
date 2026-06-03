"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuroraTextProps {
	children: ReactNode;
	className?: string;
	colors?: string[];
	speed?: number;
}

export function AuroraText({
	children,
	className,
	colors = ["#a78bfa", "#22d3ee", "#a78bfa", "#f0abfc"],
	speed = 1,
}: AuroraTextProps) {
	const gradient = `linear-gradient(135deg, ${colors.join(", ")})`;
	const animationDuration = `${10 / speed}s`;
	return (
		<span className={cn("relative inline-block", className)}>
			<span className="sr-only">{children}</span>
			<span
				aria-hidden="true"
				className="relative animate-aurora bg-clip-text text-transparent"
				style={{
					backgroundImage: gradient,
					backgroundSize: "200% 200%",
					animationDuration,
				}}
			>
				{children}
			</span>
		</span>
	);
}
