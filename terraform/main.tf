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
}
resource "aws_instance" "servernode" {
  ami                    = "ami-09d3b3274b6c5d4aa"
  instance_type          = "t2.micro"
  key_name               = "vpcpublickey"
  
   connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ec2-user"
    private_key = env.private_key 
    timeout     = "4m"
  }
  tags = {
    "name" = "DeployVM"
  }
}

resource "aws_security_group" "alb_security_group"{
  name="alb security group"
  ingress {
    from_port=22
    to_port=22
    protocol="tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description="ssh access"

}
  egress {
    from_port=0
    to_port=0
    protocol="-1"
    cidr_blocks=["0.0.0.0/0"]
  }

  tags={
    name="alb_security_group"
  }
}


output "instance_public_ip" {
  value     = aws_instance.servernode.public_ip
}
