resource "aws_security_group" "ssh_west" {
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

resource "aws_security_group" "allow_egress_west" {
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

resource "aws_security_group" "nomad_west" {
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
