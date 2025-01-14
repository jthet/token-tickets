#!/bin/bash

PROJECT_DIR="/root/token-tickets"
BUILD_DIR="$PROJECT_DIR/build"
NGINX_DIR="/var/www/tokentickets"
LOG_FILE="/var/log/deployment.log"

cd $PROJECT_DIR || { echo "Failed to change directory to $PROJECT_DIR"; exit 1; }

echo "Starting deployment: $(date)" >> $LOG_FILE
git pull --rebase origin main || { echo "Git pull failed"; exit 1; }
npm install || { echo "npm install failed"; exit 1; }
npm run build || { echo "Build failed"; exit 1; }
cp -r $BUILD_DIR/* $NGINX_DIR/ || { echo "Failed to copy build files to Nginx"; exit 1; }

pm2 restart backend/server.js || { echo "Failed to restart backend server"; exit 1; }
sudo systemctl restart nginx || { echo "Failed to restart Nginx"; exit 1; }

echo "Deployment complete: $(date)" >> $LOG_FILE