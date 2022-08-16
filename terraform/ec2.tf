data "template_file" "user_data_server" {
  template = file("${path.root}/shared/scripts/user-data-server.sh")

  vars = {
    server_count = var.nomad_server_instance_count
    region       = var.region
    retry_join = chomp(
      join(
        " ",
        formatlist("%s=%s", keys(var.retry_join), values(var.retry_join)),
      ),
    )
    nomad_binary = var.nomad_binary_url
  }
}

data "template_file" "user_data_client" {
  template = file("${path.root}/shared/scripts/user-data-client.sh")

  vars = {
    region = var.region
    retry_join = chomp(
      join(
        " ",
        formatlist("%s=%s ", keys(var.retry_join), values(var.retry_join)),
      ),
    )
    nomad_binary = var.nomad_binary_url
  }
}

resource "aws_instance" "nomad_server" {
  provider      = aws.west
  ami           = data.hcp_packer_image.nomad.cloud_image_id
  key_name      = var.key_name
  count         = var.nomad_server_instance_count
  instance_type = var.nomad_server_instance_type
  subnet_id     = aws_subnet.subnet_public_west.id
  vpc_security_group_ids = [
    aws_security_group.ssh.id,
    aws_security_group.http.id,
    aws_security_group.allow_ingress.id,
    aws_security_group.allow_egress.id,
    aws_security_group.nomad.id,
    aws_security_group.consul.id
  ]
  associate_public_ip_address = true

  # instance tags
  tags = merge(
    {
      "Name" = "${var.name}-server-${count.index}"
    },
    {
      "${var.retry_join.tag_key}" = "${var.retry_join.tag_value}"
    },
  )

  root_block_device {
    volume_type           = "gp2"
    volume_size           = var.root_block_device_size
    delete_on_termination = "true"
  }

  user_data            = data.template_file.user_data_server.rendered
  iam_instance_profile = aws_iam_instance_profile.instance_profile.name
}

resource "aws_instance" "nomad_client" {
  provider      = aws.west
  ami           = data.hcp_packer_image.nomad.cloud_image_id
  instance_type = var.nomad_client_instance_type
  key_name      = var.key_name
  count         = var.nomad_client_instance_count
  subnet_id     = aws_subnet.subnet_public_west.id
  vpc_security_group_ids = [
    aws_security_group.ssh.id,
    aws_security_group.http.id,
    aws_security_group.allow_ingress.id,
    aws_security_group.allow_egress.id,
    aws_security_group.consul.id,
    aws_security_group.nomad.id
  ]
  associate_public_ip_address = true

  # instance tags
  tags = merge(
    {
      "Name" = "${var.name}-client-${count.index}"
    },
    {
      "${var.retry_join.tag_key}" = "${var.retry_join.tag_value}"
    },
  )

  root_block_device {
    volume_type           = "gp2"
    volume_size           = var.root_block_device_size
    delete_on_termination = "true"
  }

  ebs_block_device {
    device_name           = "/dev/xvdd"
    volume_type           = "gp2"
    volume_size           = "50"
    delete_on_termination = "true"
  }

  user_data            = data.template_file.user_data_client.rendered
  iam_instance_profile = aws_iam_instance_profile.instance_profile.name
}
