"use client";

import { useState } from "react";
import { ArrowRight, GitBranch, Github, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";

const TEST_REPO = "https://github.com/kelixirr/ReactDevs.git";

const AddURL = () => {
	const [gitUrl, setGitUrl] = useState("");

	return (
		<section className="py-16">
			<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
				<StatusBadge tone="info">Step 1 of 2</StatusBadge>
				<h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
					Import from Git
				</h1>
				<p className="mt-3 max-w-lg text-sm text-muted-foreground">
					Paste a public Git repository URL. We&apos;ll fetch the branches and
					walk you through the rest.
				</p>
			</div>

			<div className="relative mx-auto mt-10 max-w-2xl">
				<Card className="relative overflow-hidden">
					<CardHeader>
						<div className="flex items-center gap-2">
							<span className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
								<Github className="h-4 w-4 text-primary" />
							</span>
							<div>
								<CardTitle>Connect a repository</CardTitle>
								<CardDescription>
									Only public repositories are supported for now.
								</CardDescription>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (gitUrl) redirect(`new/deploy?gitUrl=${gitUrl}`);
							}}
							className="flex flex-col gap-5"
						>
							<div className="flex flex-col gap-2">
								<Label htmlFor="git-url">Git repository URL</Label>
								<div className="relative">
									<GitBranch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										id="git-url"
										type="url"
										value={gitUrl}
										onChange={(e) => setGitUrl(e.target.value)}
										required
										placeholder="https://github.com/your-username/your-repo.git"
										className="pl-9 pr-28"
									/>
									{!gitUrl && (
										<button
											type="button"
											onClick={() => setGitUrl(TEST_REPO)}
											className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
										>
											<Sparkles className="h-3 w-3 text-primary" />
											Use sample
										</button>
									)}
								</div>
								<p className="text-xs text-muted-foreground">
									Example: https://github.com/vercel/next-learn.git
								</p>
							</div>

							<Button
								type="submit"
								disabled={!gitUrl}
								variant="gradient"
								size="lg"
								className="w-full"
							>
								Continue
								<ArrowRight className="h-4 w-4" />
							</Button>
						</form>
					</CardContent>
					<BorderBeam size={220} duration={9} delay={0} />
				</Card>

				<p className="mt-4 text-center text-xs text-muted-foreground">
					By continuing, you agree that the contents of the repo will be cloned
					and built on our infrastructure.
				</p>
			</div>
		</section>
	);
};

export default AddURL;
