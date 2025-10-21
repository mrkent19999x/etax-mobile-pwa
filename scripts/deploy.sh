#!/bin/bash

echo "🚀 Starting eTax Mobile PWA Deployment..."

# Git add all changes
echo "📁 Adding files to git..."
git add .

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "🚀 Auto Deploy $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
echo "2" | npx netlify-cli deploy --dir . --prod

echo "✅ Deployment Complete!"
echo "🌐 Live URL: https://etax-mobile-pwa-fixed.netlify.app"
