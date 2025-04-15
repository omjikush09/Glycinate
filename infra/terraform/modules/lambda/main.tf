data "archive_file" "lambda_ecs_start_files" {
  type = "zip"
  source_dir = var.lambda_ecs_start_src_dir
  output_path = "${path.module}/lambda_ecs_start_function_payload.zip"
}

data "archive_file" "lambda_add_to_sqs_src_dir" {
  type = "zip"
  source_dir = var.lambda_add_to_sqs_src_dir
  output_path = "${path.module}/lambda_add_to_sqs_function_payload.zip"
}
resource "aws_lambda_function" "trigger_ecs_lambda" {
    function_name = "trigger_ecs"
    filename ="${path.module}/lambda_ecs_start_function_payload.zip"
    role = var.lambda_ecs_trigger_role_arn
    handler = "dist/index.handler"
    runtime = "nodejs20.x"
    
}

resource "aws_lambda_event_source_mapping" "lambda_sqs_mapping" {
  function_name = aws_lambda_function.trigger_ecs_lambda.arn
  event_source_arn = var.sqs_arn
  
}

// *********************** ADD TO QUEUE ***********************
resource "aws_lambda_function" "add_to_queue" {
    function_name = "trigger_ecs"
    filename ="${path.module}/lambda_add_to_sqs_function_payload.zip"
    role = var.lambda_put_sqs_arn
    handler = "dist/index.handler"
    runtime = "nodejs20.x"
}