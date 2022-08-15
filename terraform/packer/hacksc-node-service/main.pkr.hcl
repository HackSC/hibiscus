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
  default = "hacksc-node-service-packer-hcp-golden-image"
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

source "amazon-ebs" "base_west" {
  ami_name      = "${var.ami_prefix}-${local.timestamp}"
  instance_type = "t2.micro"
  region        = "us-west-1"
  source_ami    = data.amazon-ami.ubuntu-focal-west.id
  ssh_username  = "ubuntu"
  tags = {
    Name        = "base-west-hacksc-backend-service"
    environment = "production"
  }
  snapshot_tags = {
    environment = "production"
  }
}

build {
  name = "base-hacksc-backend-service"
  sources = [
    "source.amazon-ebs.base_west"
  ]

  # Add SSH public key
  provisioner "file" {
    source      = "${path.root}/../shared/keys/packer-ssh.pub"
    destination = "/tmp/packer-ssh.pub"
  }

  # Execute setup script
  provisioner "shell" {
    scripts = ["${path.root}/scripts/setup-docker.sh", "${path.root}/scripts/install-ssh-key.sh"]
    # Run script after cloud-init finishes, otherwise you run into race conditions
    execute_command = "/usr/bin/cloud-init status --wait && sudo -E -S sh '{{ .Path }}'"
  }

  # Audit rules
  provisioner "file" {
    source      = "${path.root}/files/audit.rules"
    destination = "/tmp/audit.rules"
  }

  # Update Docker daemon with Loki logs
  provisioner "file" {
    source      = "${path.root}/files/docker-daemon.json"
    destination = "/tmp/daemon.json"
  }

  # Add promtail configuration file
  provisioner "file" {
    source      = "${path.root}/files/promtail.yml"
    destination = "/tmp/promtail.yaml"
  }

  # Add startup script that will run promtail on instance boot
  provisioner "file" {
    source      = "${path.root}/scripts/run-promtail.sh"
    destination = "/tmp/run-promtail.sh"
  }

  # Move temp files to actual destination
  # Must use this method because their destinations are protected
  provisioner "shell" {
    inline = [
      "sudo cp /tmp/audit.rules /etc/audit/rules.d/audit.rules",
      "sudo mkdir /opt/promtail/",
      "sudo cp /tmp/promtail.yaml /opt/promtail/promtail.yaml",
      "sudo cp /tmp/run-promtail.sh /var/lib/cloud/scripts/per-boot/run-promtail.sh",
      "sudo cp /tmp/daemon.json /etc/docker/daemon.json",
    ]
  }

  # Execute Promtail setup script
  provisioner "shell" {
    script = "${path.root}/scripts/setup-promtail.sh"
  }

  # HCP Packer settings
  hcp_packer_registry {
    bucket_name = var.packer_registry_bucket_name
    description = <<EOT
This is a golden image base for all HackSC's Node.js services. Built on top of ubuntu 20.04.
    EOT

    bucket_labels = {
      "ubuntu-version"  = "20.04"
    }
  }
}
