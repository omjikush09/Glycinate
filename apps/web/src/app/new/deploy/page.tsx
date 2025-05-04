import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import DeployForm from "@/app/components/DeployForm";

type ResponseBody = {
	name: string;
	commit: {
		sha: string;
		url: string;
	};
	protected: boolean;
}[];

const Deploy = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const repoUrl = (await searchParams)?.gitUrl as string;
	if (!repoUrl) {
		redirect("/new");
	}

	const url = repoUrl.replace(/\.git$/, "");
	const urlParts = url.split("/");
	const repo = urlParts[urlParts.length - 1];
	const user = urlParts[urlParts.length - 2];
	let branches = [];
	try {
		const response = await fetch(
			`https://api.github.com/repos/${user}/${repo}/branches`
		);
		const body: ResponseBody = await response.json();
		branches = body.map((item) => {
			return item.name;
		});
	} catch (error) {
		console.log(error);
		return (
			<>
				<h1 className="text-white">Failed Not able to fetch branches</h1>
			</>
		);
	}

	// const { branches, error } = await getBranches(repoUrl);

	return (
		<>
			<div className="flex-1 flex  justify-center items-center  pt-18">
				<Card className="w-1/2  p-6 bg-black">
					{branches && (
						<>
							<p className="text-white">Git URL - {repoUrl}</p>
							{/* <div className="flex justify-between  items-center gap-4">
								<p className="text-white text-2xl ">Provider - {provider}</p>
							</div> */}
							<div className="flex justify-center items-center">
								<DeployForm gitUrl={repoUrl} branches={branches} />
							</div>
						</>
					)}
				</Card>
			</div>
		</>
	);
};
export default Deploy;
