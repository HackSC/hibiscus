name                        = "hacksc-nomad"
region                      = "us-west-1"
hcp_bucket_nomad            = "hacksc-nomad-packer-image"
hcp_channel_nomad           = "production"
nomad_server_instance_type  = "t2.medium"
nomad_client_instance_type  = "t2.micro"
nomad_server_instance_count = 1
nomad_client_instance_count = 3
nomad_binary_url            = "https://releases.hashicorp.com/nomad/1.0.4/nomad_1.0.4_linux_amd64.zip"
key_name                    = "../shared/keys/packer-ssh.pub"