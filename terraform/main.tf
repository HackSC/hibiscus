provider "hcp" {}

provider "aws" {
  alias  = "west"
  region = var.region_west
}

data "hcp_packer_iteration" "matchsc" {
  bucket_name = var.hcp_bucket_matchsc
  channel     = var.hcp_channel_matchsc
}

data "hcp_packer_image" "matchsc_west" {
  bucket_name    = data.hcp_packer_iteration.matchsc.bucket_name
  iteration_id   = data.hcp_packer_iteration.matchsc.ulid
  cloud_provider = "aws"
  region         = var.region_west
}

resource "aws_instance" "matchsc_west" {
  provider      = aws.west
  ami           = data.hcp_packer_image.matchsc_west.cloud_image_id
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.subnet_public_west.id
  vpc_security_group_ids = [
    aws_security_group.ssh_west.id,
    aws_security_group.allow_egress_west.id,
    aws_security_group.promtail_west.id,
    aws_security_group.matchsc_west.id
  ]
  associate_public_ip_address = true

  tags = {
    Name = "matchsc-service-instance"
  }
}
