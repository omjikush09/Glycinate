output "S3_BUCKET_ARN" {
  value = aws_s3_bucket.glycinate_bucket_output.arn
}

output "s3_bucket_final_arn" {
  value = aws_s3_bucket.glycinate_bucket_final.arn
}
