

type DeployEvent = {
	gitUrl: string;
	branch: string;
	provider: string;
	projectName: string;
	projectId: string;
};

export const handler = async (event: DeployEvent) => {
	const { gitUrl, branch, provider, projectName, projectId } = event;
	if (!gitUrl || !branch || !provider || !projectName || !projectId) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Missing required parameters" }),
		};
	}
    try {
     
    } catch (error) {
        
    }
};

const buid = async (gitUrl: string, branch: string) => {
    
}
