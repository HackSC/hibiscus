variable "cidr_vpc_west" {
  description = "CIDR block for the VPC"
  default     = "10.2.0.0/16"
}

variable "cidr_subnet_west" {
  description = "CIDR block for the subnet"
  default     = "10.2.0.0/24"
}

variable "environment_tag" {
  description = "Environment tag"
  default     = "hacksc"
}

variable "region_west" {
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
