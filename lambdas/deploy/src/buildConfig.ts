import { CreateProjectCommandInput ,ArtifactsType, EnvironmentType, ComputeType} from "@aws-sdk/client-codebuild";
const getBuildCOnfig = ({
	projectName,
	provider,
	gitUrl,
    env,
    gitBranch
}: {
	projectName: string;
	provider: "GITHUB" | "GITLAB" | "BITBUCKET";
	gitUrl: string;
    env:Record<string, string>,
    gitBranch:string
}):CreateProjectCommandInput => {
	return {
		name: projectName,
		source: {
			type: provider,
			location: gitUrl,
		},
		artifacts: {
			type: ArtifactsType.S3,
			location: "omji-glycinate",
			name: `${projectName}`,
			path: "/output",
		},
		environment: {
			type: EnvironmentType.LINUX_LAMBDA_CONTAINER,
			computeType: ComputeType.BUILD_LAMBDA_1GB,
			image: "aws/codebuild/amazonlinux-x86_64-lambda-standard:nodejs20",
			environmentVariables: Object.entries(env).map(([key, value]) => ({
				name: key,
				value: value,
				type: "PLAINTEXT",
			})),
		},
		serviceRole: process.env.CODEBUILD_EXECUTION_ROLE_ARN,
		sourceVersion: gitBranch,
	};
};
