resource "aws_iam_role" "ecs_task_defination_role" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : "sts:AssumeRole",
        Principal : {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "ecs_task_defination_role_policy" {
  role = aws_iam_role.ecs_task_defination_role.name
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = {
      Effect = "Allow",
      Action = [
        "logs:CreateLogGroup",
      ],
      Resource = "*"
    }
  })
}


resource "aws_iam_role_policy_attachment" "ecs_task_role_policy" {
  role       = aws_iam_role.ecs_task_defination_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
