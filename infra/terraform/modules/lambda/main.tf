data "archive_file" "lambda_ecs_start_files" {
  type        = "zip"
  source_dir  = var.lambda_ecs_start_src_dir
  output_path = "${path.module}/lambda_ecs_start_function_payload.zip"
}
//  DEFAULT VPC DATA
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_security_group" "default" {
  filter {
    name   = "group-name"
    values = ["default"]
  }

  vpc_id = data.aws_vpc.default.id
}


// *********************** TRIGGER ECS **********************
resource "aws_lambda_function" "trigger_ecs_lambda" {
  function_name = "trigger_ecs"
  filename      = "${path.module}/lambda_ecs_start_function_payload.zip"
  architectures = ["arm64"]
  role          = var.lambda_ecs_trigger_role_arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"


  environment {
    variables = {
      TASK_DEFINITION_NAME   = "ecs_task_definition_glycinate",
      CLUSTER_NAME           = var.glycinate_cluster_name,
      AWS_BUCKET             = var.aws_bucket,
      DEFAULT_SECURITY_GROUP = data.aws_security_group.default.id,
      DEFAULT_SUBNET         = data.aws_subnets.default.ids[0]
    }
  }
}

resource "aws_lambda_event_source_mapping" "lambda_sqs_mapping" {
  function_name    = aws_lambda_function.trigger_ecs_lambda.arn
  event_source_arn = var.sqs_arn
  batch_size       = 1
}

# resource "aws_lambda_provisioned_concurrency_config" "lambda_provisioned_concurrency" {
#   function_name = aws_lambda_function.trigger_ecs_lambda.function_name
#   qualifier     = "$LATEST"
#   provisioned_concurrent_executions = 10
# }

// *********************** ADD TO QUEUE ***********************

data "archive_file" "lambda_add_to_sqs_src_dir" {
  type        = "zip"
  source_dir  = var.lambda_add_to_sqs_src_dir
  output_path = "${path.module}/lambda_add_to_sqs_function_payload.zip"
}
resource "aws_lambda_function" "add_to_queue" {
  function_name = "add_to_queue"
  filename      = "${path.module}/lambda_add_to_sqs_function_payload.zip"
  architectures = ["arm64"]
  role          = var.lambda_put_sqs_arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  environment {
    variables = {
      SQS_QUEUE_URL = var.sqs_url
    }
  }
}

// **************** UNZIP IN S3 ********************

data "archive_file" "lambda_upzip_src_dir" {
  type        = "zip"
  source_dir  = var.lambda_unzip_dir
  output_path = "${path.module}/lambda_unzip_function_payload.zip"
}

resource "aws_lambda_function" "unzip_lambda" {
  function_name = "unzip_lambda"
  architectures = ["arm64"]
  role          = aws_iam_role.unzip_lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  filename      = "${path.module}/lambda_unzip_function_payload.zip"

  environment {
    variables = {
      AWS_BUCKET_FINAL_NAME = var.AWS_BUCKET_FINAL_NAME
    }
  }
}

resource "aws_lambda_permission" "aloow_s3" {
  statement_id  = "AllowExecutionFromS3"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.unzip_lambda.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = var.AWS_BUCKET_ARN // Where is zip file uploaded
}

resource "aws_s3_bucket_notification" "s3_lambda_notification" {
  bucket = var.aws_bucket
  lambda_function {
    lambda_function_arn = aws_lambda_function.unzip_lambda.arn
    events              = ["s3:ObjectCreated:*"]
  }
  depends_on = [aws_lambda_permission.aloow_s3]
}
