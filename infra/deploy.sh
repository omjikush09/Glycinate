#!/bin/bash

set -aexuo pipefail
source .env
set +a

#!/bin/bash

if ! command -v pnpm &> /dev/null
then
    echo "pnpm not found. Installing via corepack..."

    corepack enable
    corepack prepare pnpm@latest --activate

    echo "pnpm installed successfully."
else
    echo "pnpm already installed."
fi
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

aws ecr-public get-login-password --region $AWS_REGION  | docker login --username AWS --password-stdin public.ecr.aws/d3r6v0t5/glycinate

cd ../ecs

docker build --platform=linux/arm64 -t  public.ecr.aws/d3r6v0t5/glycinate:latest .

docker push  public.ecr.aws/d3r6v0t5/glycinate:lastest

# Build Lambda Functions




cd ../terraform


terraform apply  -auto-approve
