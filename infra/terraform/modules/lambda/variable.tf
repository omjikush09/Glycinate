variable "lambda_ecs_start_src_dir" {
  type = string
}

variable "lambda_add_to_sqs_src_dir" {
  type = string
}

variable "lambda_unzip_dir" {
  type = string
}
variable "lambda_ecs_trigger_role_arn" {
  type = string
}

variable "lambda_put_sqs_arn" {
  type = string
}

variable "sqs_arn" {
  type = string
}
variable "sqs_url" {
  type = string
}

variable "glycinate_cluster_name" {
  type = string
}
variable "aws_bucket" {
  type = string
}

variable "AWS_BUCKET_ARN" {
  type = string
}

variable "AWS_BUCKET_FINAL_ARN" {
  type = string
}
variable "AWS_BUCKET_FINAL_NAME" {
  type = string
}
variable "DATABASE_URL" {
  type = string
}
