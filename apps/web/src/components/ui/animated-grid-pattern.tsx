"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	strokeDasharray?: number;
	numSquares?: number;
	className?: string;
	maxOpacity?: number;
	duration?: number;
}

export function AnimatedGridPattern({
	width = 40,
	height = 40,
	x = -1,
	y = -1,
	strokeDasharray = 0,
	numSquares = 50,
	className,
	maxOpacity = 0.5,
	duration = 4,
}: AnimatedGridPatternProps) {
	const id = useId();
	const containerRef = useRef<SVGSVGElement | null>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [squares, setSquares] = useState(() =>
		generateSquares(numSquares, { width: 1, height: 1 })
	);

	function getPos({ width: w, height: h }: { width: number; height: number }) {
		return [
			Math.floor((Math.random() * w) / width),
			Math.floor((Math.random() * h) / height),
		];
	}

	function generateSquares(
		count: number,
		dim: { width: number; height: number }
	) {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			pos: getPos(dim),
		}));
	}

	const updateSquarePosition = (sqId: number) => {
		setSquares((curr) =>
			curr.map((sq) =>
				sq.id === sqId ? { ...sq, pos: getPos(dimensions) } : sq
			)
		);
	};

	useEffect(() => {
		if (dimensions.width && dimensions.height) {
			setSquares(generateSquares(numSquares, dimensions));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions, numSquares]);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setDimensions({
					width: entry.contentRect.width,
					height: entry.contentRect.height,
				});
			}
		});
		observer.observe(node);
		return () => observer.unobserve(node);
	}, []);

	return (
		<svg
			ref={containerRef}
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full fill-white/10 stroke-white/15",
				className
			)}
		>
			<defs>
				<pattern
					id={id}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path
						d={`M.5 ${height}V.5H${width}`}
						fill="none"
						strokeDasharray={strokeDasharray}
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${id})`} />
			<svg x={x} y={y} className="overflow-visible">
				{squares.map(({ pos: [px, py], id: sid }, index) => (
					<motion.rect
						initial={{ opacity: 0 }}
						animate={{ opacity: maxOpacity }}
						transition={{
							duration,
							repeat: Infinity,
							delay: index * 0.1,
							repeatType: "reverse",
						}}
						onAnimationComplete={() => updateSquarePosition(sid)}
						key={`${sid}-${px}-${py}`}
						width={width - 1}
						height={height - 1}
						x={(px ?? 0) * width + 1}
						y={(py ?? 0) * height + 1}
						fill="currentColor"
						strokeWidth="0"
					/>
				))}
			</svg>
		</svg>
	);
}
