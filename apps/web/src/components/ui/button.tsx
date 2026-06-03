import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0 aria-invalid:ring-destructive/30 aria-invalid:border-destructive cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)] hover:bg-primary/90 hover:shadow-[0_10px_36px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90",
				outline:
					"border border-white/15 bg-white/[0.02] text-foreground backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/25",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-white/[0.06] hover:text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				gradient:
					"text-white shadow-[0_10px_40px_-15px_rgba(167,139,250,0.55)] [background:linear-gradient(110deg,#7c3aed_0%,#a78bfa_45%,#22d3ee_120%)] hover:brightness-110",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-11 rounded-lg px-6 text-[15px] has-[>svg]:px-4",
				xl: "h-12 rounded-xl px-7 text-base has-[>svg]:px-5",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
