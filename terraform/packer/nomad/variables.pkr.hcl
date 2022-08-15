variable "packer_registry_bucket_name" {
  type = string
  default = "hacksc-nomad-packer-image"
}

variable "ami_prefix" {
  type    = string
  default = "hacksc-nomad-packer-image"
}

variable "packer_build_name" {
  type    = string
  default = "hacksc-nomad-packer"
}

variable "ec2_instance_name" {
  type    = string
  default = "hacksc-nomad-server"
}
