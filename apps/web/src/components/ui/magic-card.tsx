"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface MagicCardProps extends React.ComponentProps<"div"> {
	gradientSize?: number;
	gradientColor?: string;
	gradientOpacity?: number;
	gradientFrom?: string;
	gradientTo?: string;
}

export function MagicCard({
	children,
	className,
	gradientSize = 220,
	gradientColor = "#a78bfa22",
	gradientOpacity = 0.8,
	gradientFrom = "#a78bfa",
	gradientTo = "#22d3ee",
	...props
}: MagicCardProps) {
	const cardRef = React.useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(-gradientSize);
	const mouseY = useMotionValue(-gradientSize);

	const handleMouseMove = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = cardRef.current?.getBoundingClientRect();
			if (!rect) return;
			mouseX.set(e.clientX - rect.left);
			mouseY.set(e.clientY - rect.top);
		},
		[mouseX, mouseY]
	);

	const handleMouseLeave = React.useCallback(() => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	}, [mouseX, mouseY, gradientSize]);

	React.useEffect(() => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	}, [gradientSize, mouseX, mouseY]);

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn(
				"group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-card",
				className
			)}
			{...props}
		>
			{/* animated border */}
			<motion.div
				className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom}, ${gradientTo}, transparent 75%)
          `,
				}}
			/>
			<div className="absolute inset-px rounded-[calc(theme(borderRadius.2xl)-1px)] bg-card" />
			{/* hover glow */}
			<motion.div
				className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					opacity: gradientOpacity,
					background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor}, transparent 100%)
          `,
				}}
			/>
			<div className="relative">{children}</div>
		</div>
	);
}
