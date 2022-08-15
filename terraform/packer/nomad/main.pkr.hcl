packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

data "amazon-ami" "ubuntu-focal-west" {
  region = "us-west-1"
  filters = {
    name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
    root-device-type    = "ebs"
    virtualization-type = "hvm"
  }
  most_recent = true
  owners      = ["099720109477"]
}

source "amazon-ebs" "nomad_west" {
  ami_name      = "${var.ami_prefix}-${local.timestamp}"
  instance_type = "t2.micro"
  region        = "us-west-1"
  source_ami    = data.amazon-ami.ubuntu-focal-west.id
  ssh_username  = "ubuntu"
  tags = {
    Name        = var.ec2_instance_name
    environment = "production"
  }
  snapshot_tags = {
    environment = "production"
  }
}

build {
  name = var.packer_build_name
  sources = [
    "source.amazon-ebs.base_west"
  ]

  provisioner "shell" {
    inline = [
      "sudo mkdir /ops",
      "sudo chmod 777 /ops"
    ]
  }

  # Add SSH public key
  provisioner "file" {
    source      = "${path.root}/../shared"
    destination = "/ops"
  }

  # Execute Promtail setup script
  provisioner "shell" {
    script = "${path.root}/../shared/scripts/setup.sh"
  }

  # HCP Packer settings
  hcp_packer_registry {
    bucket_name = var.packer_registry_bucket_name
    description = <<EOT
      Image for our Hashicorp Nomad instances
    EOT

    bucket_labels = {
      "ubuntu-version"  = "20.04"
    }
  }
}
