import {
	ECSClient,
	ECSClientConfig,
	RunTaskCommand,
	RunTaskCommandInput,
} from "@aws-sdk/client-ecs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cluster from "cluster";

type provider = "GITHUB";

type DeployEvent = {
	gitUrl: string;
	branch: string;
	provider: provider;
	projectName: string;
	projectId: string;
	env?: Record<string, string>;
	buildCommand: string;
};

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const handler = async (event: DeployEvent) => {
	const config = {
		region: "us-east-1",
	};
	const s3Client = new S3Client(config);
	const command = new PutObjectCommand({
		Bucket: "test",
		Key: `event/${event.projectName}`,
		ContentType: "application/zip",
		ContentLength: MAX_FILE_SIZE,
	});
	let preSignedURL = "";
	try {
		preSignedURL = await getSignedUrl(s3Client, command, {
			expiresIn: 15 * 60,
		});
	} catch (error) {
		throw error;
	}

	const ecsClinet = new ECSClient(config);

	const runTaskCommandInput: RunTaskCommandInput = {
		taskDefinition: process.env.TASK_DEFINATION_NAME,
		cluster: process.env.CLUSTER_NAMME,
		overrides: {
			containerOverrides: [
				{
					name: "test",
					environment: [
						{
							name: "PRE_SIGNED_URL",
							value: preSignedURL,
						},
						{
							name: "BUID_COMMAND",
							value: event?.buildCommand,
						},
						{
							name: "GIT_URL",
							value: event?.gitUrl,
						},
						{
                            name:"GIT_BRANCH",
                            value:event?.branch
                        },
                        {
                            name:"PROJECT_NAME",
                            value:event?.projectName
                        }
					],
				},
			],
		},
	};

	const taskRunCommand = new RunTaskCommand(runTaskCommandInput);
	try {
		const responseRunTask = await ecsClinet.send(taskRunCommand);
		console.log("RespnseRunTask " + responseRunTask);
	} catch (error) {
		throw error;
	}
};

export default handler;
