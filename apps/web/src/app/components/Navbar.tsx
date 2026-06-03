import {
	Show,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export async function Navbar() {
	return (
		<header className="sticky top-0 z-40 w-full">
			<div className="absolute inset-0 -z-10 border-b border-white/[0.06] bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40" />
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<Link href="/dashboard" className="group flex items-center gap-2.5">
					<span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_8px_24px_-8px_rgba(167,139,250,0.6)]">
						<span className="font-mono text-sm font-bold text-background">G</span>
						<span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
					</span>
					<span className="text-[15px] font-semibold tracking-tight text-foreground">
						Glycinate
					</span>
				</Link>

				<div className="flex items-center gap-2 sm:gap-3">
					<Show when="signed-in">
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="hidden sm:inline-flex"
						>
							<Link href="/dashboard">
								<LayoutDashboard className="h-4 w-4" />
								Dashboard
							</Link>
						</Button>
						<Button asChild variant="gradient" size="sm">
							<Link href="/new">
								<Plus className="h-4 w-4" />
								New Project
							</Link>
						</Button>
						<div className="ml-1 flex h-8 items-center">
							<UserButton
								appearance={{
									elements: {
										avatarBox: "h-8 w-8 ring-1 ring-white/15",
									},
								}}
							/>
						</div>
					</Show>
					<Show when="signed-out">
						<SignInButton>
							<Button variant="ghost" size="sm">
								Sign in
							</Button>
						</SignInButton>
						<SignUpButton>
							<Button variant="gradient" size="sm">
								Get started
							</Button>
						</SignUpButton>
					</Show>
				</div>
			</nav>
		</header>
	);
}
