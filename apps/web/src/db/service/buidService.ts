import { db } from "@repo/db/index";
import { deployMentTable } from "@repo/db/schema";

// const user=db

type buildStatus = "Queued" | "Started" | "Failed" | "Deployed";

const updateBuildStatus = async (status: buildStatus) => {
	try {
		const build = await db.update(deployMentTable).set({ status });
	} catch (error: unknown) {
		throw Error(String(error));
	}
};
