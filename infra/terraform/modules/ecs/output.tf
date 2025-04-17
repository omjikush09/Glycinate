output "glycinate_cluster_name" {
  value = aws_ecs_cluster.glycinate_cluster.name
}
output "ecs_task_definition_arn" {
  value = aws_ecs_task_definition.ecs_task_definition.arn
}

output "ecs_task_defination_role_arn" {
  value = aws_iam_role.ecs_task_defination_role.arn
}