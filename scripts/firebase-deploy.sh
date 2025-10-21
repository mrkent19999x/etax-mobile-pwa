#!/bin/bash

echo "🚀 Starting Firebase Deploy..."

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."
npx firebase-tools@12.9.1 deploy --only hosting

echo "✅ Firebase Deploy Complete!"
echo "🌐 Live URL: https://anhbao-373f3.web.app"
