import { db } from "@repo/db/index";
import { eq } from "@repo/db/orm";
import { projectTable } from "@repo/db/schema";


export async function GET(
	req: Request,
	{ params }: { params: Promise<{ projectname: string }> }
) {
	const { projectname } = await params;
	try {
		const user = await db
			.selectDistinct({ projectName: projectTable.name })
			.from(projectTable)
			.where(eq(projectTable.name, projectname));

		if (user.length === 0) {
			return new Response(JSON.stringify("Project Name available exist"), {
				status: 200,
			});
		}
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Something Went wrong" }), {
			status: 500,
		});
	}

	return new Response(JSON.stringify("Project Name already taken"), {
		status: 400,
	});
}
