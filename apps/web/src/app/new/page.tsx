"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitBranch } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

const AddURL = () => {
	const [gitUrl, setGitUrl] = useState("");
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGitUrl(e.target.value);
	};
	return (
		<div className="flex-1 flex  justify-center items-center">
			<Card className="w-1/2  p-6 bg-black">
				<CardContent className="flex flex-col gap-4">
					<CardTitle className="text-white text-2xl ">
						Provide Your Git URL
					</CardTitle>
					<Label className="text-white -mb-2" htmlFor="git-url">
						Git Repository URL (public url only)
					</Label>
					<div className="relative w-full">
						<GitBranch
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							size={20}
						/>
						{!gitUrl && (
							<div
								className="absolute right-2 py-1 text-white  cursor-pointer "
								onClick={() => {
									setGitUrl("https://github.com/kelixirr/ReactDevs.git");
								}}
							>
								Fill Test Data
							</div>
						)}
						<Input
							value={gitUrl}
							onChange={handleInputChange}
							id="git-url"
							type="url"
							placeholder="Enter your Git URL"
							required
							className="text-white pl-10 invalid:border-red"
						/>
					</div>
					<Button
						type="button"
						className="cursor-pointer"
						onClick={() => redirect(`new/deploy?gitUrl=${gitUrl}`)}
					>
						Continue
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddURL;
