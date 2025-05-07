resource "aws_iam_role" "unzip_lambda" {
  name = "unzip_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "unzip_lambda_role_policy" {
  name = "unzip_lambda_custom_policy"
  role = aws_iam_role.unzip_lambda.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:DeleteObject"
        ],
        Resource = ["${var.AWS_BUCKET_ARN}/*"]
      },
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject"
        ],
        Resource = ["arn:aws:s3:::${var.AWS_BUCKET_FINAL_NAME}/*"]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "unzip_lambda_basic_policy_attachment" {
  role       = aws_iam_role.unzip_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


# ****************** Lambda to get logs *************************

resource "aws_iam_role" "lambda_get_logs" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = "sts:AssumeRole",
        Principal = {
           Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}
resource "aws_iam_role_policy" "lambda_get_logs" {
  role = aws_iam_role.lambda_get_logs.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:Get*",
          "logs:List*",
        ],
        Resource = "*"
    }, ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs_basic_policy_attachment" {
  role       = aws_iam_role.lambda_get_logs.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
