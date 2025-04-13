#!/bin/bash

APP_DIR="/home/ubuntu/blank-project"

cd $APP_DIR

# Pull latest changes
git pull origin main

# Build React app
cd frontend
npm install
npm run build

# Start/Restart Express server
cd ../backend
npm install
pm2 restart all || pm2 start server.js --name "api"
