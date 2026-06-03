import { ClerkProvider } from "@clerk/nextjs";
import { ArrowLeft, GitBranch, Settings2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import DeployForm from "@/app/components/DeployForm";
import { BorderBeam } from "@/components/ui/border-beam";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

type ResponseBody = {
	name: string;
	commit: { sha: string; url: string };
	protected: boolean;
}[];

const Deploy = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const repoUrl = (await searchParams)?.gitUrl as string;
	if (!repoUrl) redirect("/new");

	const url = repoUrl.replace(/\.git$/, "");
	const urlParts = url.split("/");
	const repo = urlParts[urlParts.length - 1];
	const user = urlParts[urlParts.length - 2];

	let branches: string[] = [];
	let fetchError = false;
	try {
		const response = await fetch(
			`https://api.github.com/repos/${user}/${repo}/branches`
		);
		const body: ResponseBody = await response.json();
		branches = body.map((item) => item.name);
	} catch (error) {
		console.error(error);
		fetchError = true;
	}

	return (
		<ClerkProvider>
			<section className="py-12">
				<div className="mx-auto flex max-w-3xl flex-col">
					<Link
						href="/new"
						className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Link>
					<div className="mt-6 flex flex-col items-start gap-3">
						<StatusBadge tone="info">Step 2 of 2</StatusBadge>
						<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							Configure your deploy
						</h1>
						<p className="max-w-xl text-sm text-muted-foreground">
							Set up your project name and build settings. We&apos;ll spin up
							a fresh build environment as soon as you hit deploy.
						</p>
					</div>
				</div>

				<div className="mx-auto mt-10 max-w-3xl">
					<Card className="relative overflow-hidden">
						<CardHeader>
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2">
									<span className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
										<Settings2 className="h-4 w-4 text-primary" />
									</span>
									<div>
										<CardTitle>Project settings</CardTitle>
										<CardDescription>
											Fine-tune how your app is built and deployed.
										</CardDescription>
									</div>
								</div>
								<StatusBadge tone="neutral">
									<GitBranch className="h-3 w-3" />
									{user}/{repo}
								</StatusBadge>
							</div>

							<div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-xs text-muted-foreground">
								{repoUrl}
							</div>
						</CardHeader>

						<CardContent>
							{fetchError ? (
								<div className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-4 text-sm text-rose-300">
									We weren&apos;t able to fetch branches for this repository.
									Check the URL and make sure the repo is public.
								</div>
							) : (
								<DeployForm gitUrl={repoUrl} branches={branches} />
							)}
						</CardContent>
						<BorderBeam size={260} duration={10} delay={0} />
					</Card>
				</div>
			</section>
		</ClerkProvider>
	);
};

export default Deploy;
