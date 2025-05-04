terraform {
  required_version = "~> 1.11.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

  }
}

provider "aws" {
  region = "us-east-1"
}

module "lambda" {
  source                      = "./modules/lambda"
  lambda_ecs_start_src_dir    = "${path.root}/../../lambdas/start-ecs/dist"
  lambda_add_to_sqs_src_dir   = "${path.root}/../../lambdas/add-to-sqs/dist"
  lambda_unzip_dir            = "${path.root}/../../lambdas/unzip-output/dist"
  lambda_put_sqs_arn          = module.iam.lambda_put_sqs_arn
  lambda_ecs_trigger_role_arn = module.iam.lambda_ecs_trigger_role_arn
  sqs_arn                     = module.sqs.sqs_arn
  sqs_url                     = module.sqs.sqs_url
  glycinate_cluster_name      = module.ecs.glycinate_cluster_name
  aws_bucket                  = var.AWS_BUCKET
  AWS_BUCKET_ARN              = module.s3.S3_BUCKET_ARN
  AWS_BUCKET_FINAL_ARN        = module.s3.s3_bucket_final_arn
  AWS_BUCKET_FINAL_NAME       = var.AWS_BUCKET_FINAL_NAME
  DATABASE_URL                = var.DATABASE_URL
}

module "iam" {
  source                       = "./modules/iam"
  sqs_arn                      = module.sqs.sqs_arn
  ecs_task_definition_arn      = module.ecs.ecs_task_definition_arn
  ecs_task_defination_role_arn = module.ecs.ecs_task_defination_role_arn
  AWS_BUCKET_ARN               = module.s3.S3_BUCKET_ARN
}

module "sqs" {
  source = "./modules/sqs"
}
module "ecr" {
  source = "./modules/ecr"

}

module "ecs" {
  source        = "./modules/ecs"
  ecr_image_url = "${var.AWS_ACCOUNT_ID}.dkr.ecr.${var.AWS_REGION}.amazonaws.com/glycinate:latest"
}

module "s3" {
  source            = "./modules/s3"
  bucket_name       = var.AWS_BUCKET
  bucket_final_name = var.AWS_BUCKET_FINAL_NAME
}

variable "AWS_ACCOUNT_ID" {
  type = number
}
variable "AWS_REGION" {
  type = string
}

variable "AWS_BUCKET" {
  type = string
}

variable "AWS_BUCKET_FINAL_NAME" {
  type = string
}

variable "DATABASE_URL" {
  type = string
}
