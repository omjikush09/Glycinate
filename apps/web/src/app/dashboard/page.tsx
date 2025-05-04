import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/db/index";
import { eq } from "@repo/db/orm";
import { projectTable } from "@repo/db/schema";
import Link from "next/link";

export default async function Dashboard() {
	const { userId } = await auth();
	if (!userId) return <div>User not exist</div>;
	let response;
	try {
		response = await db
			.select({ projectName: projectTable.name, gitUrl: projectTable.gitUrl })
			.from(projectTable)
			.where(eq(projectTable.userId, userId));
	} catch (error) {
		console.error(error);
		return <div>Someting went wrong</div>;
	}

	return (
		<>
			<div className="min-h-content  flex-1 flex items-center flex-col  p-10">
				<h1 className="text-white text-8xl pb-12">Projects</h1>
				<div className="flex flex-row  max-w-[1600px] flex-wrap justify-center gap-4">
					{response &&
						response.map((project) => {
							return (
								<div
									key={project.projectName}
									className="border p-2 w-[400px] h-[200px] rounded-2xl flex flex-col justify-around items-center  flex-wrap"
								>
									<Link href={`dashboard/project/${project.projectName}`}>
										<h1 className="text-4xl text-white cursor-pointer ">
											{project.projectName}
										</h1>
									</Link>
									<p className="text-white text-1xl truncate">
										{project.gitUrl}
									</p>
								</div>
							);
						})}
				</div>
				{/* </div> */}
			</div>
		</>
	);
}
