import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary/30 selection:text-foreground",
				"flex h-10 w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-1 text-sm shadow-inner outline-none transition-[color,border-color,box-shadow,background-color]",
				"hover:border-white/15 hover:bg-white/[0.05]",
				"focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:bg-white/[0.06]",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/30",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
