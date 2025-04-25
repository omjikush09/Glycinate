resource "aws_s3_bucket" "glycinate_bucket_output" {
  bucket = var.bucket_name
  lifecycle {
    prevent_destroy = false
  }
  force_destroy = true
}

resource "aws_s3_bucket" "glycinate_bucket_final" {
  bucket = var.bucket_final_name
}