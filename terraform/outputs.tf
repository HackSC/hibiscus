output "matchsc_west_ip" {
  value       = aws_instance.matchsc_west.public_ip
  description = "Public IP address for the MatchSC instance in us-west-1."
}
