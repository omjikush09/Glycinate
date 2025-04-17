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
		console.log("RESPONSE"+response);
	} catch (error) {
		console.error("Error" + error)
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
