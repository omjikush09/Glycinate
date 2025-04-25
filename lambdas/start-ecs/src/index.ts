import {
	ECSClient,
	RunTaskCommand,
	RunTaskCommandInput,
} from "@aws-sdk/client-ecs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SQSEvent } from "aws-lambda";

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

export const handler = async (event: SQSEvent) => {
	console.log(event);
	const message: DeployEvent = JSON.parse(event.Records[0].body);
	const config = {
		region: "us-east-1",
	};
	const s3Client = new S3Client(config);
	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET,
		Key: `${message.projectName}.zip`,
		ContentType: "application/zip",
	});
	console.log(JSON.stringify(command));
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
		taskDefinition: process.env.TASK_DEFINITION_NAME,
		cluster: process.env.CLUSTER_NAME,
		networkConfiguration: {
			awsvpcConfiguration: {
				subnets: [process.env.DEFAULT_SUBNET ?? ""],
				securityGroups: [process.env.DEFAULT_SECURITY_GROUP ?? ""],
				assignPublicIp: "ENABLED",
			},
		},
		capacityProviderStrategy: [
			{
				capacityProvider: "FARGATE_SPOT",
		
			},
		],
		overrides: {
			containerOverrides: [
				{
					name: "glycinate_container",
					environment: [
						{
							name: "SIGNED_S3_URL",
							value: preSignedURL,
						},
						{
							name: "BUILD_CMD",
							value: message?.buildCommand,
						},
						{
							name: "GIT_URL",
							value: message?.gitUrl,
						},
						{
							name: "GIT_BRANCH",
							value: message?.branch,
						},
						{
							name: "BUILD_OUTPUT",
							value: `${message?.projectName}.zip`,
						},
					],
				},
			],
		},
	};

	const taskRunCommand = new RunTaskCommand(runTaskCommandInput);
	try {
		const responseRunTask = await ecsClinet.send(taskRunCommand);
		console.log("RespnseRunTask " + JSON.stringify(responseRunTask));
	} catch (error) {
		throw error;
	}
};
