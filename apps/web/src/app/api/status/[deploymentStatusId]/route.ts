import { db } from "@repo/db/index";
import { eq } from "@repo/db/orm";
import { deployMentTable } from "@repo/db/schema";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ deploymentStatusId: string }> }
) {
	const { deploymentStatusId } = await params;
	if (!deploymentStatusId)
		return new Response("No deployment Id", { status: 400 });

	try {
		const status = await db
			.select({ status: deployMentTable.status })
			.from(deployMentTable)
			.where(eq(deployMentTable.id, Number(deploymentStatusId)));

		const currStatus = status[0]?.status;

		return new Response(JSON.stringify({ status: currStatus }), {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify("Eror"), {
			status: 500,
		});
	}
}
