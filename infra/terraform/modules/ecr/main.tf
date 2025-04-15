
resource "aws_ecr_repository" "ecr_repository" {
  name = "glycinate"
  image_tag_mutability = "MUTABLE"
}