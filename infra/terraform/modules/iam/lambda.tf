resource "aws_iam_role_policy" "lambdaExecutionRolePolicy" {
  name = "lambdaExecutionRolePolicy"
  role = aws_iam_role.lambdaExecutionRole.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "codebuild:StartBuild",
          "codebuild:CreateProject",
        ],
        Effect   = "Allow",
        Resource = "*"
      }

    ]
  })
}

resource "aws_iam_role" "lambdaExecutionRole" {

  assume_role_policy = jsonencode({
    Version : "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect= "Allow"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambdaExecutionRolePolicyAtachment" {
  role       = aws_iam_role.lambdaExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


