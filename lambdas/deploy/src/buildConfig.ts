import { CreateProjectCommandInput ,ArtifactsType, EnvironmentType, ComputeType} from "@aws-sdk/client-codebuild";
export type provider = "GITHUB" | "GITLAB" | "BITBUCKET";

const getBuildCOnfig = ({
	projectName,
	provider,
	gitUrl,
    env,
    gitBranch,
	buildCommand
}: {
	projectName: string;
	provider: provider,
	gitUrl: string;
    env?:Record<string, string>,
    gitBranch:string,
	buildCommand:string
}):CreateProjectCommandInput => {
	return {
		name: projectName,
		source: {
			type: provider,
			location: gitUrl,
			buildspec: `
version: 0.2

phases:
  install:
    commands:
      - npm ci
  build:
    commands:
      - ${buildCommand}

artifacts:
  base-directory: dist
  files:
    - '**/*'
`,
		},
		artifacts: {
			type: ArtifactsType.S3,
			location: "omji-glycinate",
			name: `${projectName}`,
			path: "output",
		},
		environment: {
			type: EnvironmentType.LINUX_LAMBDA_CONTAINER,
			computeType: ComputeType.BUILD_LAMBDA_1GB,
			image: "aws/codebuild/amazonlinux-x86_64-lambda-standard:nodejs20",
			environmentVariables:
				env &&
				Object.entries(env).map(([key, value]) => ({
					name: key,
					value: value,
					type: "PLAINTEXT",
				})),
		},
		serviceRole: process.env.CODEBUILD_EXECUTION_ROLE_ARN,
		sourceVersion: gitBranch,
	};
};

export {getBuildCOnfig};
