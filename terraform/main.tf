terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.0"
    }
  }
}

provider "aws" {
  region = var.region
  access_key = var.access_key
  secret_key = var.secret_key
}
resource "aws_instance" "servernode" {
  ami                    = "ami-09d3b3274b6c5d4aa"
  instance_type          = "t2.micro"
  #key_name               = aws_key_pair.deployer.key_name
 # connection {
 #   type        = "ssh"
 #   host        = self.public_ip
 #   user        = "ubuntu"
 #   private_key = var.private_key
 #   timeout     = "4m"
#}
  tags = {
    "name" = "DeployVM"
  }
}

#resource "aws_key_pair" "deployer" {
#  key_name   = var.key_name
#  public_key = var.public_key
#}

output "instance_public_ip" {
  value     = aws_instance.servernode.public_ip
  sensitive = true
}
