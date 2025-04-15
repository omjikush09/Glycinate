import {
	SQSClient,
	ListQueuesCommand,
	SendMessageCommandInput,
	SendMessageCommand,
} from "@aws-sdk/client-sqs";

const config = {
	region: "us-east-1",
};
const client = new SQSClient(config);

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

export const handler = async (event: DeployEvent) => {
	const sendMessageInput: SendMessageCommandInput = {
		QueueUrl: SQS_QUEUE_URL,
		MessageAttributes: {
			Title: {
				StringValue: "BUILD",
				DataType: "String"
			},
		},
		MessageBody:JSON.stringify(event)
	};
	const command=new SendMessageCommand(sendMessageInput);
	try {
		const response = await client.send(command);
	} catch (error) {
		return {
			statusCode:400,
			message:"Someting went wrong"
		}
	}
	
	return {
		statusCode:200,
		message:"Started building..."
	}
};
