import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { db } from "@repo/db/index";
import { userTable } from "@repo/db/schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		// Do something with payload
		// For this guide, log payload to console

		const { id } = evt.data;
		if (id === undefined) throw Error("Id not found");
		await db.insert(userTable).values({ id: id });

		const eventType = evt.type;
		console.log(
			`Received webhook with ID ${id} and event type of ${eventType}`
		);
		console.log("Webhook payload:", evt.data);

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
