import {
	SQSClient,
	SendMessageCommandInput,
	SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { APIGatewayEvent } from "aws-lambda";
import { db } from "@repo/db/index";
import { deployMentTable, projectTable } from "@repo/db/schema";

const config = {
	region: "us-east-1",
};
const client = new SQSClient(config);
// Test Data
// {
//   "gitUrl": "https://github.com/kelixirr/ReactDevs.git",
//   "branch": "main",
//   "provider": "GITHUB",
//   "projectName": "test",
//   "projectId": "first",
//   "buildCommand": "npm run build"
// }
type provider = "GITHUB";

type DeployEvent = {
	gitUrl: string;
	branch: string;
	provider: provider;
	projectName: string;
	projectId: string;
	env?: Record<string, string>;
	buildCommand: string;
	baseDirectory: string;
	buildFolder: string;
};

const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

export const handler = async (event: APIGatewayEvent) => {
	console.log("Received event:", JSON.stringify(event, null, 2));
	const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
	const body = event.body;

	if (!body || !userId) {
		return {
			statusCode: 400,
			message: "No body found",
		};
	}

	const bodyParsed: DeployEvent = JSON.parse(body);

	if (
		!bodyParsed?.gitUrl ||
		!bodyParsed?.branch ||
		!bodyParsed?.projectName ||
		!bodyParsed?.buildCommand ||
		!bodyParsed?.buildFolder ||
		!bodyParsed?.baseDirectory
	) {
		return {
			statusCode: 400,
			message: "Missing required fields",
		};
	}
	let project;
	try {
		project = await db
			.insert(projectTable)
			.values({
				buildCommand: bodyParsed.buildCommand,
				buildFolder: bodyParsed.buildFolder,
				gitUrl: bodyParsed.gitUrl,
				name: bodyParsed.projectName,
				branch: bodyParsed.branch,
				gitProvider: "GITHUB",
				sourceFolder: bodyParsed.baseDirectory,
				userId: userId,
			})
			.returning({ projectId: projectTable.id });
	} catch (error) {
		console.error(error);
		return {
			statusCode: 400,
			message: "Something went wrong",
		};
	}

	try {
		const deploymentStatusUpdate = await db
			.insert(deployMentTable)
			.values({
				projectId: project[0]?.projectId,
				status: "Queued",
			})
			.returning({ deploymentId: deployMentTable.id });
		console.log("DB response " + JSON.stringify(deploymentStatusUpdate));
		const sendMessageInput: SendMessageCommandInput = {
			QueueUrl: SQS_QUEUE_URL,
			MessageAttributes: {
				Title: {
					StringValue: "BUILD",
					DataType: "String",
				},
			},
			MessageBody: JSON.stringify({
				...bodyParsed,
				deploymentId: deploymentStatusUpdate[0]?.deploymentId,
			}),
		};

		const command = new SendMessageCommand(sendMessageInput);
		const response = await client.send(command);
		console.log("RESPONSE" + JSON.stringify(response));
	} catch (error) {
		console.error("Error" + error);
		return {
			statusCode: 400,
			message: "Someting went wrong",
		};
	}

	return {
		statusCode: 200,
		message: "Started building...",
	};
};
