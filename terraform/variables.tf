variable "name" {
  description = "Common name fragment of the server/client instances"
}

variable "key_name" {
  description = "Name of key to be loaded onto EC2 instances"
}

variable "cidr_vpc_west" {
  description = "CIDR block for the VPC"
  default     = "10.2.0.0/16"
}

variable "cidr_subnet_west" {
  description = "CIDR block for the subnet"
  default     = "10.2.0.0/24"
}

variable "whitelist_ips" {
  type        = list(string)
  description = "IP ranges to whitelist to our security groups"
  default     = ["0.0.0.0/0"] # world for now
}

variable "environment_tag" {
  description = "Environment tag"
  default     = "hacksc"
}

variable "region" {
  description = "The region where Terraform deploys our resources"
  default     = "us-west-1"
}

variable "hcp_bucket_matchsc" {
  description = "HCP Packer bucket name for matchsc image"
  default     = "matchsc-packer-image"
}

variable "hcp_channel_matchsc" {
  description = "HCP Packer channel name for matchsc image"
  default     = "production"
}

variable "hcp_bucket_nomad" {
  description = "HCP Packer bucket name for our Nomad image"
  default     = "hacksc-nomad-packer-image"
}

variable "hcp_channel_nomad" {
  description = "HCP Packer channel name for our Nomad image"
  default     = "production"
}

variable "nomad_server_instance_type" {
  description = "Amazon EC2 instance type of our Nomad server instances"
}

variable "nomad_client_instance_type" {
  description = "Amazon EC2 instance type of our Nomad client instances"
}

variable "nomad_server_instance_count" {
  description = "Number of Amazon EC2 instances for Nomad servers"
}

variable "nomad_client_instance_count" {
  description = "Number of Amazon EC2 instances for Nomad clients"
}

variable "retry_join" {
  type        = map(string)
  description = "KVs to be tagged onto client instances registering them with Nomad through Consul via auto-join"
  default = {
    provider  = "aws"
    tag_key   = "ConsulAutoJoin"
    tag_value = "auto-join"
  }
}

variable "nomad_binary_url" {
  description = "Public URL to download Nomad's binary file"
}

variable "root_block_device_size" {
  description = "Size of root block device"
  default     = 50
}
