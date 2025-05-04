#!/bin/bash

set -aexuo pipefail
source .env
set +a


npm i -g pnpm@10.10.0
cd ../
pnpm i -g turbo@2.4.4
turbo run build --filter=@repo/db
cd ./infra
cd ../lambdas/add-to-sqs
pnpm add .
pnpm run build

cd ../start-ecs
pnpm add .
pnpm run build

cd ../unzip-output
pnpm add .
pnpm run build

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
