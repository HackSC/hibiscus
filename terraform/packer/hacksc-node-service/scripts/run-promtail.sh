# Run promtail in background
cd /opt/promtail
nohup ./promtail-linux-amd64 -config.file=./promtail.yaml &
