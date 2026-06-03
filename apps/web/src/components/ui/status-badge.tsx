import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const toneStyles: Record<Tone, { dot: string; text: string; bg: string }> = {
	success: {
		dot: "bg-emerald-400",
		text: "text-emerald-300",
		bg: "bg-emerald-400/10 border-emerald-400/20",
	},
	warning: {
		dot: "bg-amber-400",
		text: "text-amber-300",
		bg: "bg-amber-400/10 border-amber-400/20",
	},
	danger: {
		dot: "bg-rose-400",
		text: "text-rose-300",
		bg: "bg-rose-400/10 border-rose-400/20",
	},
	info: {
		dot: "bg-sky-400",
		text: "text-sky-300",
		bg: "bg-sky-400/10 border-sky-400/20",
	},
	neutral: {
		dot: "bg-zinc-400",
		text: "text-zinc-300",
		bg: "bg-zinc-400/10 border-zinc-400/20",
	},
};

export function StatusBadge({
	tone = "neutral",
	pulse = false,
	children,
	className,
}: {
	tone?: Tone;
	pulse?: boolean;
	children: React.ReactNode;
	className?: string;
}) {
	const t = toneStyles[tone];
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
				t.bg,
				t.text,
				className
			)}
		>
			<span className="relative flex h-1.5 w-1.5">
				{pulse && (
					<span
						className={cn(
							"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
							t.dot
						)}
					/>
				)}
				<span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", t.dot)} />
			</span>
			{children}
		</span>
	);
}
