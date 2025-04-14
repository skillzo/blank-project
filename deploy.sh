#!/bin/bash

APP_DIR="/home/ubuntu/blank-project"

cd $APP_DIR

# Pull latest changes
git pull origin main

# Build React app
cd frontend
npm install
npm run build
sudo chmod -R o+rx /home/ubuntu/blank-project/frontend

# Start/Restart Express server
cd ../backend
npm install
pm2 restart all || pm2 start server.js --name "api"
