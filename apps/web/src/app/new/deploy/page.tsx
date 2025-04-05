import { getBranches, getGitProvider } from "@/utils/git";
import { Card, } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Deploy = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	console.log(await searchParams);
	const repoUrl = (await searchParams)?.gitUrl as string;
	if (!repoUrl) {
		redirect("/new");
	}
	const { branches, error } = await getBranches(repoUrl);
	const { provider, error: errorGitProvider } = await getGitProvider(repoUrl);
	return (
		<>
			<div className="flex  justify-center items-center h-full w-full">
				<Card className="w-1/2  p-6 bg-black">
					{!errorGitProvider && error && (
						<p className="text-red-500">{error}</p>
					)}
					{errorGitProvider && (
						<p className="text-red-500">Git Provider not Supported </p>
					)}
					{!error && (
						<>
							<p className="text-white">Git URL - {repoUrl}</p>
							<div className="flex justify-between  items-center gap-4">
                                
                                <p className="text-white text-2xl " >Provider - {provider}</p>
								<div className=" flex flex-col gap-2" >
									<Label className="text-white">Branches</Label>
									<Select>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Choose Branch" />
										</SelectTrigger>
										<SelectContent className="bg-black">
											{branches?.map((branch) => (
												<SelectItem
													className="text-white"
													key={branch}
													value={branch}
												>
													{branch}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
                                <Button  >Deploy</Button>
						</>
					)}
				</Card>
			</div>
		</>
	);
};
export default Deploy;
