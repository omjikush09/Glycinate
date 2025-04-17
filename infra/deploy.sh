#!/bin/bash

set -aexuo pipefail
source .env
set +a

cd ./terraform

terraform init
terraform plan 
terraform apply -target=module.ecr -auto-approve

aws ecr get-login-password --region $AWS_REGION  | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

cd ../ecs

docker build --platform=linux/amd64 -t  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/glycinate:latest .

docker push  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/glycinate:latest

# Build Lambda Functions

cd ../../lambdas/add-to-sqs
npm ci
npm run build

cd ../start-ecs
npm ci
npm run build


cd ../../infra/terraform


terraform apply  -auto-approve
