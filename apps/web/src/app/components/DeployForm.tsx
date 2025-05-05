"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@clerk/nextjs";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
	// provider: z.enum(["GITHUB"]),
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
			// provider: "GITHUB",
			branch: branches[0],
		},
	});

	const projectName = form.watch("projectName");
	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (projectName) {
				const nodeEnv = process.env.NODE_ENV;
				try {
					const data = await fetch(
						nodeEnv === "development"
							? `http://localhost:3000/api/checkprojectname/${projectName}`
							: `https://glycinate.in/api/checkprojectname/${projectName}`
					);
					if (data.status != 200) {
						form.setError("projectName", {
							type: "validate",
							message: "Project Name is already taken. Try other",
						});
					}else{
						form.clearErrors("projectName")
					}
				} catch (error) {
					console.error(error);
				}
			}
		}, 100);
		return () => clearTimeout(delayDebounce);
	}, [projectName]);


	async function onSubmit(values: z.infer<typeof projctFormSchema>) {
		const authToken = await session?.getToken();
		console.log(authToken);
		toast("About to start the Deployment...");

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
			console.log(response);
			if (response.status == 200) {
				toast.success("Build started....");
				router.push(
					`/dashboard/project/${data.projectName}/deployments/${data.deployMentId}/logs`
				);
			} else {
				toast.error("Failed to Start the build..");
			}
		} catch (error: unknown) {
			console.error(error);
			toast.error(String(error));
		}
	}

	return (
		<div className="text-white w-2/3 ">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
					<FormField
						control={form.control}
						name="projectName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Name</FormLabel>
								<FormControl>
									<Input placeholder="project Name" {...field} />
								</FormControl>
								<FormMessage className="text-white" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="buildFolder"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Build Folder</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the path of build folder"
										{...field}
									/>
								</FormControl>
								<FormDescription>Example: dist, public</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="baseDirectory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Source Folder</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the path of source folder"
										{...field}
									/>
								</FormControl>
								<FormDescription>Example: . , ./frotend</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="buildCommand"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Build Command</FormLabel>
								<FormControl>
									<Input
										placeholder="Command to build the project"
										{...field}
									/>
								</FormControl>
								<FormDescription>Example: npm run build</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="branch"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Branch</FormLabel>
								<FormControl>
									<Select {...field}>
										<SelectTrigger className="w-full text-white">
											<SelectValue
												className="text-white"
												placeholder="Choose Branch"
											/>
										</SelectTrigger>
										<SelectContent className=" text-white bg-black">
											{branches?.map((branch) => (
												<SelectItem
													className="text-white bg-black"
													key={branch}
													value={branch}
												>
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
					<Button className="w-full bg-blue-800 cursor-pointer" type="submit">
						Deploy
					</Button>
				</form>
			</Form>
		</div>
	);
}
