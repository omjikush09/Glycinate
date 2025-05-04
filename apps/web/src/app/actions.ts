"use server";
import { z } from "zod";
import { projctFormSchema } from "./components/DeployForm";
import { db } from "@repo/db/index";
import { auth } from "@clerk/nextjs/server";
import { projectTable } from "@repo/db/schema";

export async function createProject(project: z.infer<typeof projctFormSchema>) {
	const { userId } = await auth();
	if (userId == null) {
		throw Error("User Not found");
	}
	try {
		const data = await db.insert(projectTable).values({
			buildCommand: project.buildCommand,
			buildFolder: project.buildFolder,
			gitUrl: project.gitUrl,
			name: project.projectName,
			branch: project.branch,
			gitProvider: "GITHUB",
			sourceFolder: project.baseDirectory,
			userId: userId,
		});
        return {
            message:"Project Created"
        }
	} catch (error) {
		console.error(error);
		throw error;
	}
}
