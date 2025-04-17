resource "aws_s3_bucket" "glycinate_bucket_output" {
  bucket = var.bucket_name
}