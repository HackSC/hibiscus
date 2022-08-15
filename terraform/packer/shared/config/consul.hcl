log_level = "INFO"
data_dir = "/opt/consul/data"
bind_addr = "0.0.0.0"
client_addr = "0.0.0.0"
advertise_addr = "{{ GetPrivateIP }}"
ports {
  grpc = 8502
}
connect {
  enabled = true
}

ui = true
server = true
bootstrap_expect = SERVER_COUNT

retry_join = ["RETRY_JOIN"]
service {
  name = "consul"
}
