import {
	SQSClient,
	SendMessageCommandInput,
	SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { APIGatewayEvent } from "aws-lambda";
import { db } from "@repo/db/index";
import { deployMentTable, projectTable } from "@repo/db/schema";
import { ratelimit } from "./db";

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
	// console.log("THIS IS BODY+ " + body);

	if (!body ) {
		console.log("Missing body log");
		return {
			statusCode: 400,
			body: JSON.stringify("No body found"),
		};
	}
	if ( !userId) {
		console.log("Missing userID log" + userId);
		return {
			statusCode: 400,
			body: JSON.stringify("No user Id found"),
		};
	}

	const { success } = await ratelimit.limit(userId);
	if(!success){
		return {
			statsCode:429,
			body:JSON.stringify({error:"Too many request"})
		}
	}

	let bodyParsed: DeployEvent;
	try {
		bodyParsed = JSON.parse(body);
	} catch (e) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Invalid JSON body" }),
		};
	}

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
			body: JSON.stringify("Missing required fields"),
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
			.returning({
				projectId: projectTable.id,
				projectName: projectTable.name,
			});
	} catch (error) {
		console.error(error);
		return {
			statusCode: 400,
			body: JSON.stringify({
				error:
					"Something is wrong with the data. try changing the project name",
			}),
		};
	}
	let deploymentStatusUpdate;
	try {
		deploymentStatusUpdate = await db
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
			body: JSON.stringify({ error: "Someting went wrong" }),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			projectName: project[0]?.projectName,
			deployMentId: deploymentStatusUpdate[0]?.deploymentId,
		}),
	};
};
