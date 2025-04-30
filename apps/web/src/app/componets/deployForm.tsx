"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
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
	provider: z.enum(["GITHUB"]),
	branch: z.string().min(1),
});

export default function DeployForm({
	gitUrl,
	provider,
	branches,
}: {
	gitUrl: string;
	provider: string;
	branches: string[];
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: "",
			gitUrl: gitUrl,
			baseDirectory: "",
			buildFolder: "dist",
			buildCommand: "npm run build",
			provider: "GITHUB",
			branch: branches[0],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
								<FormMessage />
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
					<Button className="w-full bg-blue-800" type="submit">Deploy</Button>
				</form>
			</Form>
		</div>
	);
}
