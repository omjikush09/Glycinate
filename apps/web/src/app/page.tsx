import Link from "next/link";
import {
	ArrowRight,
	GitBranch,
	Globe,
	Rocket,
	ShieldCheck,
	Sparkles,
	Workflow,
	Zap,
} from "lucide-react";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AuroraText } from "@/components/ui/aurora-text";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
			{/* Page-wide ambient background */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.22_0.08_290/_0.45)_0%,transparent_70%)]" />
				<div className="absolute inset-x-0 top-0 h-[36rem]">
					<AnimatedGridPattern
						numSquares={30}
						maxOpacity={0.08}
						duration={3}
						className={cn(
							"[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
							"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
						)}
					/>
				</div>
				<Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#a78bfa" />
			</div>

			<SiteHeader />
			<Hero />
			<LogoBar />
			<Features />
			<HowItWorks />
			<FinalCTA />
			<Footer />
		</main>
	);
}

function SiteHeader() {
	return (
		<header className="relative z-20">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2.5">
					<span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_8px_24px_-8px_rgba(167,139,250,0.6)]">
						<span className="font-mono text-sm font-bold text-background">G</span>
						<span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
					</span>
					<span className="text-[15px] font-semibold tracking-tight">
						Glycinate
					</span>
				</Link>
				<nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
					<a href="#features" className="hover:text-foreground transition-colors">
						Features
					</a>
					<a href="#how" className="hover:text-foreground transition-colors">
						How it works
					</a>
					<a
						href="https://app.eraser.io/workspace/h6tKjbTXfDXku3XmBXYc"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Architecture
					</a>
					<a
						href="https://linktr.ee/omjikush09"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Contact
					</a>
				</nav>
				<div className="flex items-center gap-2">
					<Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
						<Link href="/dashboard">Sign in</Link>
					</Button>
					<Button asChild variant="gradient" size="sm">
						<Link href="/new">
							Deploy
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}

function Hero() {
	return (
		<section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
			<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
				<Link
					href="/new"
					className="group mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-white/20 hover:text-foreground"
				>
					<Sparkles className="h-3.5 w-3.5 text-primary" />
					Introducing Glycinate v1 — zero-config React deploys
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</Link>

				<h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
					Ship your React app
					<br />
					at the speed of{" "}
					<AuroraText className="font-bold">thought</AuroraText>
				</h1>
				<p className="text-pretty mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
					Glycinate turns a Git URL into a live, globally distributed React
					app in under a minute. No YAML, no servers, no surprises — just
					push, deploy, and share.
				</p>

				<div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
					<Button asChild variant="gradient" size="xl" className="min-w-44">
						<Link href="/new">
							Start deploying
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
					<Button asChild variant="outline" size="xl" className="min-w-44">
						<Link href="/dashboard">View dashboard</Link>
					</Button>
				</div>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
					<span className="inline-flex items-center gap-1.5">
						<ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
						Free SSL on every deploy
					</span>
					<span className="inline-flex items-center gap-1.5">
						<Globe className="h-3.5 w-3.5 text-cyan-400" />
						Global edge subdomains
					</span>
					<span className="inline-flex items-center gap-1.5">
						<GitBranch className="h-3.5 w-3.5 text-violet-300" />
						Connects to any public Git repo
					</span>
				</div>
			</div>

			{/* Product preview card */}
			<div className="relative mx-auto mt-16 max-w-5xl">
				<div className="pointer-events-none absolute -inset-x-10 -top-12 h-44 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.72_0.18_295/_0.35)_0%,transparent_70%)] blur-2xl" />
				<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
					<div className="rounded-xl border border-white/5 bg-background/80">
						<div className="flex items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
							<div className="flex items-center gap-1.5">
								<span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
								<span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
								<span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
							</div>
							<div className="hidden flex-1 items-center justify-center sm:flex">
								<div className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
									<Globe className="h-3.5 w-3.5" />
									my-app.glycinate.in
								</div>
							</div>
							<StatusBadge tone="success" pulse>
								Deployed
							</StatusBadge>
						</div>
						<div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-5">
							<div className="md:col-span-2">
								<p className="text-xs uppercase tracking-wider text-muted-foreground">
									Project
								</p>
								<p className="mt-1 text-lg font-medium">my-portfolio</p>
								<p className="mt-3 text-xs text-muted-foreground">Repository</p>
								<p className="mt-1 truncate text-sm">
									github.com/you/portfolio
								</p>
								<div className="mt-5 grid grid-cols-2 gap-2 text-xs">
									<div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
										<p className="text-muted-foreground">Branch</p>
										<p className="mt-0.5 font-mono">main</p>
									</div>
									<div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
										<p className="text-muted-foreground">Build</p>
										<p className="mt-0.5 font-mono">npm run build</p>
									</div>
								</div>
							</div>
							<div className="relative md:col-span-3">
								<div className="overflow-hidden rounded-lg border border-white/5 bg-[oklch(0.12_0.012_270)] font-mono text-[12px] leading-relaxed text-zinc-300">
									<div className="border-b border-white/5 px-3 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
										Build logs
									</div>
									<pre className="overflow-x-auto p-3">
										<span className="text-violet-300">→</span> Cloning repository...
										{"\n"}
										<span className="text-violet-300">→</span> Installing dependencies (npm)
										{"\n"}
										<span className="text-violet-300">→</span> Running build command
										{"\n"}
										<span className="text-cyan-300">✓</span> Compiled successfully in 14.2s
										{"\n"}
										<span className="text-cyan-300">✓</span> Uploaded 142 assets to edge
										{"\n"}
										<span className="text-emerald-400">●</span> Live at https://my-portfolio.glycinate.in
									</pre>
								</div>
							</div>
						</div>
					</div>
					<BorderBeam size={260} duration={9} delay={0} />
				</div>
			</div>
		</section>
	);
}

function LogoBar() {
	const stack = [
		"React",
		"Vite",
		"Next.js",
		"TypeScript",
		"AWS",
		"Redis",
		"Docker",
	];
	return (
		<section className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
			<p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
				Built on a battle-tested stack
			</p>
			<div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground/80">
				{stack.map((tool) => (
					<span
						key={tool}
						className="rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-xs"
					>
						{tool}
					</span>
				))}
			</div>
		</section>
	);
}

function Features() {
	return (
		<section
			id="features"
			className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
		>
			<div className="mx-auto max-w-2xl text-center">
				<p className="text-sm font-medium text-primary">Features</p>
				<h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
					Everything you need to ship — nothing you don&apos;t
				</h2>
				<p className="mt-4 text-muted-foreground">
					A purpose-built deploy pipeline for modern React apps, with the
					thoughtful defaults a great DX deserves.
				</p>
			</div>

			<BentoGrid className="mx-auto mt-14 max-w-6xl">
				<BentoCard
					name="One-click Git deploys"
					description="Paste a repository URL, pick a branch, and we handle the rest — clone, build, package, ship."
					Icon={GitBranch}
					className="col-span-3 lg:col-span-2"
					background={
						<div className="absolute inset-0">
							<GridPattern
								className="[mask-image:radial-gradient(400px_circle_at_top_right,white,transparent)]"
								squares={[
									[4, 2],
									[5, 3],
									[8, 5],
									[10, 2],
									[12, 4],
								]}
							/>
						</div>
					}
				/>
				<BentoCard
					name="Live build logs"
					description="Stream every line of your build in real time. No tab-switching, no guesswork."
					Icon={Workflow}
					className="col-span-3 lg:col-span-1"
					background={
						<div className="absolute inset-0 flex items-end p-6 opacity-80">
							<pre className="overflow-hidden rounded-md border border-white/5 bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-zinc-400">
								<span className="text-violet-300">→</span> npm install
								{"\n"}
								<span className="text-violet-300">→</span> vite build
								{"\n"}
								<span className="text-cyan-300">✓</span> bundle 84kb
								{"\n"}
								<span className="text-emerald-400">●</span> deployed
							</pre>
						</div>
					}
				/>
				<BentoCard
					name="Global edge subdomains"
					description="Every project gets a fast, free *.glycinate.in subdomain backed by a global CDN."
					Icon={Globe}
					className="col-span-3 lg:col-span-1"
					background={
						<div className="absolute inset-0">
							<DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
						</div>
					}
				/>
				<BentoCard
					name="Fast, isolated builds"
					description="Each build runs in a fresh, sandboxed container — reproducible, isolated, and quick."
					Icon={Zap}
					className="col-span-3 lg:col-span-2"
					background={
						<div className="absolute inset-0">
							<GridPattern
								className="[mask-image:radial-gradient(500px_circle_at_bottom_left,white,transparent)]"
								squares={[
									[2, 4],
									[3, 5],
									[6, 3],
									[9, 6],
								]}
							/>
						</div>
					}
				/>
			</BentoGrid>
		</section>
	);
}

function HowItWorks() {
	const steps = [
		{
			n: "01",
			title: "Connect your repo",
			body: "Drop in any public Git URL — we fetch the available branches automatically.",
			icon: GitBranch,
		},
		{
			n: "02",
			title: "Configure your build",
			body: "Pick a branch, build command, source folder, and output folder. Sensible defaults are pre-filled.",
			icon: Workflow,
		},
		{
			n: "03",
			title: "Ship to the edge",
			body: "We build, package, and publish your app to a global subdomain in under a minute.",
			icon: Rocket,
		},
	];
	return (
		<section
			id="how"
			className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
		>
			<div className="mx-auto max-w-2xl text-center">
				<p className="text-sm font-medium text-primary">How it works</p>
				<h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
					From a Git URL to a live URL in three steps
				</h2>
			</div>

			<div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
				{steps.map((s) => (
					<div
						key={s.n}
						className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl transition-colors hover:border-primary/40"
					>
						<div className="flex items-center justify-between">
							<span className="font-mono text-xs text-muted-foreground">
								{s.n}
							</span>
							<s.icon className="h-5 w-5 text-primary" />
						</div>
						<h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
						<p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
						<div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
					</div>
				))}
			</div>
		</section>
	);
}

function FinalCTA() {
	return (
		<section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
			<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.22_0.06_290)] via-[oklch(0.16_0.04_280)] to-[oklch(0.18_0.05_240)] p-10 sm:p-14">
				<AnimatedGridPattern
					numSquares={20}
					maxOpacity={0.1}
					duration={3}
					className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
				/>
				<div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
					<h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
						Your next deploy is a paste away
					</h2>
					<p className="mt-4 text-muted-foreground">
						Connect a repo, watch it build, and share a live URL — all in
						the time it takes to brew a coffee.
					</p>
					<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
						<Button asChild variant="gradient" size="xl">
							<Link href="/new">
								Start deploying
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="xl">
							<Link href="/dashboard">Open dashboard</Link>
						</Button>
					</div>
				</div>
				<BorderBeam size={320} duration={11} delay={0} />
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="relative z-10 border-t border-white/[0.06]">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400">
						<span className="font-mono text-[10px] font-bold text-background">
							G
						</span>
					</span>
					<span>© {new Date().getFullYear()} Glycinate. All rights reserved.</span>
				</div>
				<div className="flex items-center gap-5">
					<a
						href="https://app.eraser.io/workspace/h6tKjbTXfDXku3XmBXYc"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Architecture
					</a>
					<a
						href="https://linktr.ee/omjikush09"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
}
