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
  source         = "./modules/lambda"
  lambda_ecs_start_src_dir = "${path.root}/../../../lambdas/start-ecs/dist"
  lambda_add_to_sqs_src_dir = "${path.root}/../../../lambdas/add-to-sqs/dist"
  lambda_put_sqs_arn = module.iam.lambda_put_sqs_arn
  lambda_ecs_trigger_role_arn = module.iam.lambda_ecs_trigger_role_arn
  sqs_arn = module.sqs.sqs_arn
}

module "iam" {
  source = "./modules/iam"
  sqs_arn = module.sqs.sqs_arn
}

module "sqs" {
  source = "./modules/sqs"
}
module "ecr" {
  source = "./modules/ecr"
  
}

module "ecs" {
  source = "./modules/ecs"
  ecr_image_url="d"
}