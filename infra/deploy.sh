#!/bin/bash

set -aexuo pipefail
source .env
set +a



cd ../lambdas/add-to-sqs
npm i
npm run build

cd ../start-ecs
npm i
npm run build

cd ../unzip-output
npm i
npm run build

cd ../../infra/terraform

terraform init
terraform plan 
terraform apply -target=module.ecr -auto-approve

aws ecr get-login-password --region $AWS_REGION  | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

cd ../ecs

docker build --platform=linux/arm64 -t  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/glycinate:latest .

docker push  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/glycinate:latest

# Build Lambda Functions




cd ../terraform


terraform apply  -auto-approve
