
resource "aws_sqs_queue" "queue" {
    name = "GlycinateQueue"
    max_message_size = 1024
    delay_seconds = 10
}

