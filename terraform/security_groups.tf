resource "aws_security_group" "ssh" {
  provider = aws.west
  name     = "ssh_22"
  vpc_id   = aws_vpc.vpc_west.id

  # SSH access from the VPC
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_security_group" "allow_ingress" {
  provider = aws.west
  name     = "allow_ingress"
  vpc_id   = aws_vpc.vpc_west.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }
}

resource "aws_security_group" "allow_egress" {
  provider = aws.west
  name     = "allow_egress"
  vpc_id   = aws_vpc.vpc_west.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "promtail_west" {
  provider = aws.west
  name     = "promtail_9800"
  vpc_id   = aws_vpc.vpc_west.id

  ingress {
    from_port   = 9800
    to_port     = 9800
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "matchsc_west" {
  provider = aws.west
  name     = "matchsc_3333"
  vpc_id   = aws_vpc.vpc_west.id

  ingress {
    from_port   = 3333
    to_port     = 3333
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "nomad" {
  provider = aws.west
  name     = "nomad_4646"
  vpc_id   = aws_vpc.vpc_west.id

  ingress {
    from_port   = 4646
    to_port     = 4646
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "consul" {
  provider = aws.west
  name     = "consul_8500"
  ingress {
    from_port   = 8500
    to_port     = 8500
    protocol    = "tcp"
    cidr_blocks = var.whitelist_ips
  }
}

resource "aws_security_group" "http" {
  provider = aws.west
  name     = "http_80"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.whitelist_ips
  }
}


resource "aws_security_group" "server_lb" {
  name   = "${var.name}-srv-lb"
  vpc_id = aws_vpc.vpc_west.id

  # Nomad
  ingress {
    from_port   = 4646
    to_port     = 4646
    protocol    = "tcp"
    cidr_blocks = var.whitelist_ips
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "client_lb" {
  name   = "${var.name}-cli-lb"
  vpc_id = aws_vpc.vpc_west.id

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.whitelist_ips
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
