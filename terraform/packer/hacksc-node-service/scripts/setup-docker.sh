#!/bin/bash
set -e

# Install necessary dependencies
sudo apt-get update
sudo apt-get -y -qq install docker.io auditd unzip docker-compose

# Setup sudo to allow no-password sudo for "hacksc" group and adding "terraform" user
sudo groupadd -r hacksc
sudo useradd -m -s /bin/bash terraform
sudo usermod -a -G hacksc terraform
sudo cp /etc/sudoers /etc/sudoers.orig
echo "terraform ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/terraform
