import {
	BatchGetProjectsCommand,
	CodeBuildClient,
	CreateProjectCommand,
	StartBuildCommand,
} from "@aws-sdk/client-codebuild";
import { getBuildCOnfig, provider } from "./buildConfig";

const config = {
	region: "us-east-1",
};
const client = new CodeBuildClient(config);

type DeployEvent = {
	gitUrl: string;
	branch: string;
	provider: provider;
	projectName: string;
	projectId: string;
	env?: Record<string, string>;
	buildCommand: string;
};

export const handler = async (event: DeployEvent) => {
	const { gitUrl, branch, provider, projectName, projectId, env ,buildCommand} = event;
	if (!gitUrl || !branch || !provider || !projectName || !projectId || !buildCommand) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Missing required parameters" }),
		};
	}
	try {
		const response = await createBuidProject(
			buildCommand,
			projectName,
			provider,
			gitUrl,
			branch,
			env
		);
		console.log("Response of create project" + JSON.stringify(response));
		console.log("Wait for project Start")
		waitForProjectCreation(projectName);
		const build = await startBuildProject(projectName);
		console.log("Response of start build" + JSON.stringify(build));
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Build started successfully" }),
		};
	} catch (error) {
		console.error("Error while creating project" + error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error }),
		};
	}
};

const createBuidProject = async (
	buildCommand: string,
	projectName: string,
	provider: provider,
	gitUrl: string,
	gitBranch: string,
	env?: Record<string, string>
) => {
	const command = new CreateProjectCommand(
		getBuildCOnfig({
			gitUrl,
			gitBranch,
			projectName,
			provider,
			env,
			buildCommand,
		})
	);
	return await client.send(command);
};

const startBuildProject = async (projectName: string) => {
	const command = new StartBuildCommand({ projectName });
	return await client.send(command);
};

const waitForProjectCreation = async (projectName: string, retries = 5) => {
	for (let i = 0; i < retries; i++) {
		const command = new BatchGetProjectsCommand({ names: [projectName] });
		const result = await client.send(command);
		if (result.projects?.length) {
			return;
		}
		await new Promise((res) => setTimeout(res, 1000)); // wait 1 second
	}
	throw new Error(`Project ${projectName} not found after waiting.`);
};
