import { APIGatewayEvent } from "aws-lambda";
import { ratelimit } from "@repo/redis";
import { deployMentTable } from "@repo/db/schema";
import { db } from "@repo/db/index";
import { eq } from "@repo/db/orm";
import {
	CloudWatchLogsClient,
	GetLogEventsCommand,
	GetLogEventsRequest,
	ValidationException,
} from "@aws-sdk/client-cloudwatch-logs";

const config = {
	region: "us-east-1",
};

const client = new CloudWatchLogsClient(config);

export const handler = async (request?: APIGatewayEvent) => {
	const body = request?.body;
	if (!body) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "No body provided" }),
		};
	}
	const bodyParsed = JSON.parse(body);
	const userId = request.requestContext.authorizer?.jwt?.claims?.sub;
	const parmas = request.pathParameters;
	const deploymentId = Number(parmas?.["deploymentId"]);
	if (!deploymentId || typeof deploymentId !== "number") {
		return {
			statusCode: "400",
			body: JSON.stringify({ error: "Please check deploymentId" }),
		};
	}

	const { success } = await ratelimit.limit(userId);
	if (!success) {
		return {
			statsCode: 429,
			body: JSON.stringify({ error: "Too many request" }),
		};
	}
	let deployment: {
		ecsBuildId: string | null;
	}[];
	try {
		deployment = await db
			.select({ ecsBuildId: deployMentTable.ecsBuildId })
			.from(deployMentTable)
			.where(eq(deployMentTable.id, deploymentId));
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Someting went wrong" }),
		};
	}

	const input: GetLogEventsRequest = {
		logGroupName: "/ecs/glycinate-logs",
		logStreamName: "ecs/glycinate_container/" + deployment[0]?.ecsBuildId,
		startFromHead: true,
		nextToken: bodyParsed.nextToken,
	};
	try {
		const command = new GetLogEventsCommand(input);
		const response = await client.send(command);
		console.log("RESPONSE " + response);
		return {
			statusCode: 200,
			body: JSON.stringify({ data: response }),
		};
	} catch (error: any) {
		console.error("Failed to get error " + error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error?.message }),
		};
	}
};
