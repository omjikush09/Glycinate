resource "aws_iam_role" "codebuild_role" {
    name = "codebuild_execution_role"

    assume_role_policy = jsonencode({
        Version="2012-10-17",
        Statement=[
            {
                Effect="Allow",
                Principal={
                    Service = "codebuild.amazonaws.com"
                },
                Action= "sts:AssumeRole"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "codeBuild_policy" {
  role =  aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess"
}