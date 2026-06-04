#!/bin/bash

# Netlify Deployment Script for Cletus Blaze Capture
echo "🚀 Deploying Cletus Blaze Capture to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify (if not already logged in)
echo "🔐 Checking Netlify authentication..."
netlify status || netlify login

# Initialize and deploy
echo "📦 Building and deploying site..."
netlify deploy --prod --dir . --message "Production deployment - $(date)"

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://cletusblazecapture.netlify.app"