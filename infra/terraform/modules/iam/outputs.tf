output "lambda_ecs_trigger_role_arn" {
  value = aws_iam_role.lambda_trigger_ecs_role.arn
}
output "lambda_put_sqs_arn" {
  value = aws_iam_role.lambda_put_sqs.arn
  
}