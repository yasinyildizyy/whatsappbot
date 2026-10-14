# WhatsApp Bot Deployment Guide

This document provides step-by-step instructions for deploying the WhatsApp Bot application on a clean Ubuntu server using Docker Compose.

## Prerequisites
- Ubuntu 22.04 LTS server
- SSH access with sudo privileges
- Minimum 4GB RAM (8GB recommended)
- Minimum 20GB disk space

## Step 1: Install Docker and Docker Compose

```bash
# Update package index
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Step 2: Clone Repository

```bash
git clone https://github.com/your-username/whatsappbot.git
cd whatsappbot
```

## Step 3: Configure Environment Variables

1. Edit the `.env.production` file:
```bash
nano .env.production
```

2. Update the following values with secure credentials:
   - `MONGO_ROOT_PASSWORD`: Strong password for MongoDB root user
   - `SESSION_SECRET`: Random secret for session management
   - `RATE_LIMIT_MAX`: Adjust based on expected traffic

## Step 4: Start the Application

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Step 5: Verify Deployment

Check running containers:
```bash
docker ps
```

View logs for a specific service:
```bash
docker logs backend
```

## Step 6: Configure Firewall

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw enable
```

## Step 7: Maintenance Commands

Stop all services:
```bash
docker-compose -f docker-compose.prod.yml down
```

Update to latest code:
```bash
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

## Important Security Notes
1. Change all default credentials before deployment
2. Set up HTTPS using a reverse proxy like Nginx
3. Regularly update Docker images and OS packages
4. Configure automated backups for MongoDB data
5. Monitor resource usage with `docker stats`