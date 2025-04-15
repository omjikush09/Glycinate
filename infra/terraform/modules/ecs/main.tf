
// ECS CLUSTER
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "glycinate_ecs_cluster"
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family = "ecs_task_definition_glycinate"
  requires_compatibilities = ["FARGATE"]
  cpu="2024"
  memory = "4"
  execution_role_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  container_definitions = jsonencode([
    {
        name="glcniate_container"
        image=var.ecr_image_url
        cpu=512
        memory=1
        stopTimeout:60*15
    }
  ])
}
