data "archive_file" "lambda_trigger_files" {
  type = "zip"
  source_dir = var.lambda_src_dir
  output_path = "${path.module}/lambda_function_payload.zip"
}

resource "aws_lambda_function" "trigger_ecs_lambda" {
    function_name = "trigger_ecs"
    filename ="${path.module}/lambda_function_payload.zip"
    role = var.lambda_ecs_trigger_role_arn
    handler = "dist/index.handler"
    runtime = "nodejs20.x"
    
    # environment {
    #   # variables = {
    #   #   # CODEBUILD_EXECUTION_ROLE_ARN=var.codebuild_execution_role_arn
    #   # }
    # }

}

resource "aws_lambda_event_source_mapping" "lambda_sqs_mapping" {
  function_name = aws_lambda_function.trigger_ecs_lambda.arn
  event_source_arn = var.sqs_arn
  
}