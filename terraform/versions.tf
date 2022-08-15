terraform {
  required_version = ">= 0.13"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.26.0"
    }
    hcp = {
      source  = "hashicorp/hcp"
      version = "0.40.0"
    }
  }

  cloud {
    organization = "hacksc"
    hostname     = "app.terraform.io"

    workspaces {
      name = "platform-services"
    }
  }
}
