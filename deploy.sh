#!/bin/bash

# Björnsta Portfolio - Quick Deployment Script for Netlify

echo "🚀 Preparing Björnsta Portfolio for Netlify deployment..."
echo ""

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📤 Ready to deploy!"
    echo ""
    echo "Choose your deployment method:"
    echo "1. Run: netlify deploy --prod"
    echo "2. Or push to GitHub and connect via Netlify Dashboard"
    echo ""
    echo "📋 Don't forget to:"
    echo "  - Configure form notifications in Netlify Dashboard"
    echo "  - Set up custom domain if needed"
    echo "  - Update environment variables"
    echo ""
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
