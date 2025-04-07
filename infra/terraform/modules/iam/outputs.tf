output "lambda_execution_role_arn" {
  value = aws_iam_role.lambdaExecutionRole.arn
}
output "codebuild_execution_role_arn" {
  value = aws_iam_role.codebuild_role.arn
  
}