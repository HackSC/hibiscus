# Set up promtail
cd /opt/promtail
sudo curl -O -L "https://github.com/grafana/loki/releases/download/v1.5.0/promtail-linux-amd64.zip"
sudo unzip "promtail-linux-amd64.zip"
sudo chmod a+x "promtail-linux-amd64"

## Configure Docker with promtail
sudo docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
sudo docker plugin disable loki --force
sudo docker plugin upgrade loki grafana/loki-docker-driver:latest --grant-all-permissions
sudo docker plugin enable loki

# Restart auditd
sudo systemctl restart auditd

# Restart docker
sudo systemctl restart docker
