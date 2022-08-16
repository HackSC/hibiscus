# output "matchsc_west_ip" {
#   value       = aws_instance.matchsc_west.public_ip
#   description = "Public IP address for the MatchSC instance in us-west-1."
# }

output "server_public_ips" {
  value = aws_instance.nomad_server[*].public_ip
}

output "client_public_ips" {
  value = aws_instance.nomad_server[*].public_ip
}

output "server_lb_ip" {
  value = aws_elb.server_lb.dns_name
}

output "client_lb_ip" {
  value = aws_elb.client_lb.dns_name
}

output "IP_Addresses" {
  value = <<CONFIGURATION
To connect, add your private key and SSH into any client or server with
`ssh ubuntu@PUBLIC_IP`. You can test the integrity of the cluster by running:

  $ consul members
  $ nomad server members
  $ nomad node status

If you see an error message like the following when running any of the above
commands, it usually indicates that the configuration script has not finished
executing:

"Error querying servers: Get http://127.0.0.1:4646/v1/agent/members: dial tcp
127.0.0.1:4646: getsockopt: connection refused"

Simply wait a few seconds and rerun the command if this occurs.

The Nomad UI can be accessed at http://${aws_elb.server_lb.dns_name}:4646/ui
The Consul UI can be accessed at http://${aws_elb.server_lb.dns_name}:8500/ui

Tasks accepting traffic on port 80 can be reached at http://${aws_elb.client_lb.dns_name}/

Set the following for access from the Nomad CLI:

  export NOMAD_ADDR=http://${aws_elb.server_lb.dns_name}:4646

CONFIGURATION

}
