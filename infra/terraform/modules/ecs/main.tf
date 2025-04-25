resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "ecs_task_definition_glycinate"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024" # 1 vCPU for the task
  memory                   = "2048" # 2 GB RAM for the task
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_defination_role.arn

  runtime_platform {
    cpu_architecture = "ARM64"
    operating_system_family = "LINUX"
  }
  

  container_definitions = jsonencode([
    {
      name   = "glycinate_container"
      image  = var.ecr_image_url
      cpu    = 1024
      memory = 2048

      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/glycinate-logs"
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "ecs"
          awslogs-create-group  = "true"
        }
      }

    }
  ])

}


resource "aws_ecs_cluster" "glycinate_cluster" {
  name = "glycinate_cluster"
  
}

resource "aws_ecs_cluster_capacity_providers" "glycinate_cluster_capacity_providers" {
  cluster_name = aws_ecs_cluster.glycinate_cluster.name

  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    weight            = 100
    capacity_provider = "FARGATE_SPOT"
  }
}