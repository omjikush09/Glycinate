"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
	className?: string;
	fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
	return (
		<motion.svg
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 1.2 }}
			className={cn(
				"pointer-events-none absolute -top-40 left-0 z-0 h-[169%] w-[138%] lg:-top-80 lg:left-60",
				className
			)}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 3787 2842"
			fill="none"
		>
			<g filter="url(#filter)">
				<ellipse
					cx="1924.71"
					cy="273.501"
					rx="1924.71"
					ry="273.501"
					transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
					fill={fill}
					fillOpacity="0.18"
				/>
			</g>
			<defs>
				<filter
					id="filter"
					x="0.860352"
					y="0.838989"
					width="3785.16"
					height="2840.26"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="151"
						result="effect1_foregroundBlur"
					/>
				</filter>
			</defs>
		</motion.svg>
	);
}
