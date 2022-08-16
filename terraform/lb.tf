resource "aws_elb" "server_lb" {
  name               = "${var.name}-server-lb"
  availability_zones = distinct(aws_instance.nomad_server.*.availability_zone)
  internal           = false
  instances          = aws_instance.nomad_server.*.id
  listener {
    instance_port     = 4646
    instance_protocol = "http"
    lb_port           = 4646
    lb_protocol       = "http"
  }
  listener {
    instance_port     = 8500
    instance_protocol = "http"
    lb_port           = 8500
    lb_protocol       = "http"
  }
  security_groups = [
    aws_security_group.consul.id,
    aws_security_group.nomad.id,
    aws_security_group.egress.id
  ]
}

resource "aws_elb" "client_lb" {
  name               = "${var.name}-client-lb"
  availability_zones = distinct(aws_instance.nomad_client.*.availability_zone)
  internal           = false
  instances          = aws_instance.nomad_client.*.id
  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }
  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }
  security_groups = [
    aws_security_group.http.id,
    aws_security_group.egress.id
  ]
}
