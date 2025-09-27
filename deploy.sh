#!/bin/bash

# Easy Timer - Vercel Deployment Script

echo "🚀 Deploying Easy Timer to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Install it with: npm i -g vercel"
    exit 1
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Vercel CLI found and user authenticated"

# Deploy to Vercel
echo "🔄 Starting deployment..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your Easy Timer app is now live on Vercel!"
