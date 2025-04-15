#!/bin/bash

set -exuo pipefail

cd ./terraform

terraform init
terraform plan -target=module.ecr

