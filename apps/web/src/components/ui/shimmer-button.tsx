"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ComponentProps<"button"> {
	shimmerColor?: string;
	shimmerSize?: string;
	borderRadius?: string;
	shimmerDuration?: string;
	background?: string;
}

export const ShimmerButton = React.forwardRef<
	HTMLButtonElement,
	ShimmerButtonProps
>(
	(
		{
			shimmerColor = "#ffffff",
			shimmerSize = "0.06em",
			shimmerDuration = "2.6s",
			borderRadius = "100px",
			background = "linear-gradient(110deg, oklch(0.22 0.04 290) 0%, oklch(0.18 0.05 280) 50%, oklch(0.22 0.04 290) 100%)",
			className,
			children,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				style={
					{
						"--spread": "90deg",
						"--shimmer-color": shimmerColor,
						"--radius": borderRadius,
						"--speed": shimmerDuration,
						"--cut": shimmerSize,
						"--bg": background,
					} as React.CSSProperties
				}
				className={cn(
					"group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white",
					"[background:var(--bg)] [border-radius:var(--radius)]",
					"transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
					"hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.55)]",
					className
				)}
				{...props}
			>
				{/* shimmer container */}
				<div
					className={cn(
						"-z-30 blur-[2px]",
						"absolute inset-0 overflow-visible [container-type:size]"
					)}
				>
					<div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
						<div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
					</div>
				</div>
				{children}
				{/* Highlight */}
				<div
					className={cn(
						"insert-0 absolute h-full w-full",
						"rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
						"transform-gpu transition-all duration-300 ease-in-out",
						"group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
						"group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
					)}
				/>
				{/* backdrop */}
				<div
					className={cn(
						"absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
					)}
				/>
			</button>
		);
	}
);
ShimmerButton.displayName = "ShimmerButton";
