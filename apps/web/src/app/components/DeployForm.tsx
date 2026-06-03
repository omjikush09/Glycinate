"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const projctFormSchema = z.object({
	gitUrl: z.string(),
	buildFolder: z.string().min(1),
	buildCommand: z.string().min(1),
	baseDirectory: z.string().min(1),
	projectName: z
		.string()
		.trim()
		.regex(/^[a-zA-Z0-9-]+$/, {
			message: "Only letters, numbers, and hyphens are allowed",
		})
		.transform((val: string) => val.toLowerCase()),
	branch: z.string().min(1),
});

export default function DeployForm({
	gitUrl,
	branches,
}: {
	gitUrl: string;
	branches: string[];
}) {
	const { session } = useSession();
	const router = useRouter();
	const form = useForm<z.infer<typeof projctFormSchema>>({
		resolver: zodResolver(projctFormSchema),
		defaultValues: {
			projectName: "",
			gitUrl: gitUrl,
			baseDirectory: "./",
			buildFolder: "./dist",
			buildCommand: "npm run build",
			branch: branches[0] ?? "",
		},
	});

	const projectName = form.watch("projectName");

	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (projectName) {
				try {
					const data = await fetch(`/api/checkprojectname/${projectName}`);
					if (data.status !== 200) {
						form.setError("projectName", {
							type: "validate",
							message: "Project name is already taken. Try another.",
						});
					} else {
						form.clearErrors("projectName");
					}
				} catch (error) {
					console.error(error);
				}
			}
		}, 200);
		return () => clearTimeout(delayDebounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectName]);

	async function onSubmit(values: z.infer<typeof projctFormSchema>) {
		const authToken = await session?.getToken();
		toast("Queueing your deployment…");

		try {
			const response = await fetch(
				"https://5nheiorlg8.execute-api.us-east-1.amazonaws.com/add_to_queue",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify({
						projectId: "df",
						provider: "GITHUB",
						...values,
					}),
				}
			);
			const data: { projectName: string; deployMentId: string } =
				await response.json();
			if (response.status === 200) {
				toast.success("Build started");
				router.push(
					`/dashboard/project/${data.projectName}/deployments/${data.deployMentId}/logs`
				);
			} else {
				toast.error("Failed to start the build");
			}
		} catch (error: unknown) {
			console.error(error);
			toast.error(String(error));
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="projectName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project name</FormLabel>
							<FormControl>
								<Input placeholder="my-awesome-app" {...field} />
							</FormControl>
							<FormDescription>
								Used for your URL: <span className="font-mono">{(field.value || "your-project")}.glycinate.in</span>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="branch"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Branch</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Choose a branch" />
										</SelectTrigger>
										<SelectContent>
											{branches?.map((branch) => (
												<SelectItem key={branch} value={branch}>
													{branch}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="baseDirectory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Source folder</FormLabel>
								<FormControl>
									<Input placeholder="./" {...field} />
								</FormControl>
								<FormDescription>e.g. <span className="font-mono">./</span> or <span className="font-mono">./frontend</span></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="buildCommand"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Build command</FormLabel>
								<FormControl>
									<Input placeholder="npm run build" {...field} />
								</FormControl>
								<FormDescription>e.g. <span className="font-mono">npm run build</span></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="buildFolder"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Output folder</FormLabel>
								<FormControl>
									<Input placeholder="./dist" {...field} />
								</FormControl>
								<FormDescription>e.g. <span className="font-mono">dist</span>, <span className="font-mono">build</span></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					variant="gradient"
					size="lg"
					className="w-full"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					<Rocket className="h-4 w-4" />
					{form.formState.isSubmitting ? "Deploying…" : "Deploy"}
				</Button>
			</form>
		</Form>
	);
}
