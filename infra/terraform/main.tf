terraform {
  required_version = "~> 1.11.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

  }

  backend "s3" {
    bucket  = "omji-terrafom"
    key     = "glycinate/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = "us-east-1"
}

module "lambda" {
  source         = "./modules/lambda"
  lambda_src_dir = "${path.root}/../../lambdas/deploy"
  codebuild_execution_role_arn= module.iam.codebuild_execution_role_arn
  lambda_execution_role_arn = module.iam.lambda_execution_role_arn
}

module "iam" {
  source = "./modules/iam"
}

