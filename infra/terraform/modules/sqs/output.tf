output "sqs_arn" {
  value = aws_sqs_queue.queue.arn
}

output "sqs_url" {
  value = aws_sqs_queue.queue.url
}