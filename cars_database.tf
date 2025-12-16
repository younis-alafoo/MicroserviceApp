provider "aws" {
  region = "eu-north-1"
}

resource "aws_dynamodb_table" "cars" {
  name         = "Cars"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "CarsTable"
  }
}