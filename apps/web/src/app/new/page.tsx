import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitBranch } from "lucide-react";

const NewProject = () => {
	return (
		<div className="flex  justify-center items-center h-full w-full">
			<Card className="w-1/2  p-6 bg-black">
				<CardContent className="flex flex-col gap-4">
					<CardTitle className="text-white text-2xl ">
						Provide Your Git Url
					</CardTitle>
					<Label className="text-white -mb-2" htmlFor="git-url">
						Git Repository Url
					</Label>
					<div className="relative w-full">
						<GitBranch
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							size={20}
						/>
						<Input
							id="git-url"
							type="url"
							placeholder="Enter your Git URL"
							required
							className="text-white pl-10 invalid:border-red"
						/>
					</div>
					<Button type="button">Continue</Button>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default NewProject;
