import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.ComponentProps<"div"> {
	reverse?: boolean;
	pauseOnHover?: boolean;
	vertical?: boolean;
	repeat?: number;
}

export function Marquee({
	className,
	reverse,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	...props
}: MarqueeProps) {
	return (
		<div
			{...props}
			style={
				{
					"--duration": "30s",
					"--gap": "1rem",
					...props.style,
				} as React.CSSProperties
			}
			className={cn(
				"group flex overflow-hidden p-2 [gap:var(--gap)]",
				{
					"flex-row": !vertical,
					"flex-col": vertical,
				},
				className
			)}
		>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
							"animate-marquee flex-row": !vertical,
							"animate-marquee-vertical flex-col": vertical,
							"group-hover:[animation-play-state:paused]": pauseOnHover,
							"[animation-direction:reverse]": reverse,
						})}
					>
						{children}
					</div>
				))}
		</div>
	);
}
