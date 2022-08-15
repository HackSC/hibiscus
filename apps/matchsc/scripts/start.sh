#!/bin/bash

cd /home/ubuntu
sudo docker-compose --env-file .env.production -f docker-compose.prod.yml up -d
