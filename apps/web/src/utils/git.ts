import simpleGit from "simple-git";

export async function getBranches(repoUrl: string) {
	if (!repoUrl) {
		return { error: "No repo URL provided" };
	}

	const git = simpleGit();
	try {
		const branches = await git.listRemote(["--refs", "--heads", repoUrl]);
		const branchList = branches
			.split("\n")
			.map((line) => line.split("\t")[1] ?? "") // Get the branch name part
			.filter((line) => line) // Remove empty lines
			.map((line) => line.replace("refs/heads/", "").trim()); // Remove prefix

		return { branches: branchList };
	} catch (error) {
		console.error("Error fetching branches:", error);
		return { error: "Failed to fetch branches" };
	}
}

export async function getGitProvider(repoUrl: string) {
	if(!repoUrl) {
		return { error: "No repo URL provided" };
	}
	repoUrl = repoUrl.trim();
	if(repoUrl.includes("github.com")) {
		return { provider: "GITHUB" };
	}
	return {error: "Unsupported Git provider" };
}

