packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "ami_prefix" {
  type    = string
  default = "matchsc-service"
}

data "hcp-packer-iteration" "golden" {
  bucket_name     = "golden-hacksc-node-service"
  channel         = "production"
}

data "hcp-packer-image" "golden_base_west" {
  bucket_name      = data.hcp-packer-iteration.golden.bucket_name
  iteration_id     = data.hcp-packer-iteration.golden.id
  cloud_provider   = "aws"
  region           = "us-west-1"
}

locals {
  timestamp           = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "service_west" {
  ami_name      = "${var.ami_prefix}-${local.timestamp}"
  instance_type = "t2.micro"
  region        = "us-west-1"
  source_ami    = data.hcp-packer-image.golden_base_west.id
  ssh_username = "ubuntu"
  tags = {
    Name          = "matchsc-service"
    environment   = "production"
  }
  snapshot_tags = {
    environment   = "production"
  }
}

build {
  name = "matchsc-packer"
  sources = [
    "source.amazon-ebs.service_west"
  ]

  # Add SSH public key
  provisioner "file" {
    source      = "${path.root}/../../terraform/packer/keys/packer-ssh.pub"
    destination = "/tmp/packer-ssh.pub"
  }

  # Add configuration file
  provisioner "file" {
    source      = "${path.root}/.env.production"
    destination = ".env.production"
  }

  # Add Docker Compose file
  provisioner "file" {
    source      = "${path.root}/docker-compose.prod.yml"
    destination = "docker-compose.prod.yml"
  }

  # Add startup script that will run hashicups on instance boot
  provisioner "file" {
    source      = "${path.root}/scripts/start.sh"
    destination = "/tmp/start.sh"
  }

  # Move temp files to actual destination
  # Must use this method because their destinations are protected
  provisioner "shell" {
    inline = [
      "sudo cp /tmp/start.sh /var/lib/cloud/scripts/per-boot/start.sh",
    ]
  }

  # HCP Packer settings
  hcp_packer_registry {
    bucket_name = "matchsc-packer-image"
    description = <<EOT
This is an image for matchsc built on top of the golden base image.
    EOT
  }
}
