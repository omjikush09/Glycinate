#************** Lambda trigger ECS  ***********
resource "aws_iam_role_policy" "lambda_trigger_ecs_role" {
  name = "lambda_trigger_ecs_role"
  role = aws_iam_role.lambda_trigger_ecs_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        Effect   = "Allow",
        Resource = var.sqs_arn
      },
      {
        Action=[
          "ecs:RunTask",
          "ecs:DescribeTasks",
        ]
        Effect="Allow",
        Resource=var.ecs_task_definition_arn
      },{
        Action=[
          "iam:PassRole"
        ],
        Effect="Allow",
        Resource=var.ecs_task_defination_role_arn
      },{
        Effect="Allow",
        Action=[
         "s3:*", 
        ]
        Resource="*"
      }

    ]
  })
}



resource "aws_iam_role" "lambda_trigger_ecs_role" {

  assume_role_policy = jsonencode({
    Version : "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect= "Allow"
      }
    ]
  })
}



resource "aws_iam_role_policy_attachment" "lambdaExecutionRolePolicyAtachment" {
  role       = aws_iam_role.lambda_trigger_ecs_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


// ***********   Lambda Put on SQS        ****************

resource "aws_iam_role" "lambda_put_sqs" {
  assume_role_policy = jsonencode({
    Version:"2012-10-17",
    Statement:[
      {
        Effect:"Allow",
        Action:"sts:AssumeRole",
        Principal:{
          Service="lambda.amazonaws.com"
        }
      }
    ]
  })
}
resource "aws_iam_role_policy" "lambda_put_sqs_policy" {
  name = "lambda_put_sqs_policy"
   role= aws_iam_role.lambda_put_sqs.id
   policy = jsonencode({
      Version:"2012-10-17",
      Statement:[
        {
          Effect:"Allow",
          Action:[
            "sqs:SendMessage"
          ]
          Resource:var.sqs_arn
        }
      ]
   })
}

resource "aws_iam_role_policy_attachment" "lambdaExecutionRolePolicyAtachment_lambda_put_sqs" {
  role       = aws_iam_role.lambda_put_sqs.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}