import {
	SQSClient,
	ListQueuesCommand,
	SendMessageCommandInput,
	SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { APIGatewayEvent } from "aws-lambda";

const config = {
	region: "us-east-1",
};
const client = new SQSClient(config);

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
};

const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

export const handler = async (event: APIGatewayEvent) => {
	// console.log("Received event:", JSON.stringify(event, null, 2));
	const body = event.body ;
	

	if (!body) {
		return {
			statusCode: 400,
			message: "No body found",
		};
	}
	const bodyParsed:DeployEvent = JSON.parse(body);
	if(!bodyParsed?.gitUrl || !bodyParsed?.branch || !bodyParsed?.projectName || !bodyParsed?.projectId || !bodyParsed?.buildCommand) {
		return {
			statusCode: 400,		
			message: "Missing required fields",
		};
	}

	const sendMessageInput: SendMessageCommandInput = {
		QueueUrl: SQS_QUEUE_URL,
		MessageAttributes: {
			Title: {
				StringValue: "BUILD",
				DataType: "String",
			},
		},
		MessageBody: body,
	};
	const command = new SendMessageCommand(sendMessageInput);
	try {
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
