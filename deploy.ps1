# Easy Timer - Vercel Deployment Script for PowerShell

Write-Host "🚀 Deploying Easy Timer to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    $null = Get-Command vercel -ErrorAction Stop
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Vercel CLI is not installed." -ForegroundColor Red
    Write-Host "📦 Install it with: npm i -g vercel" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
try {
    $null = & vercel whoami 2>$null
    Write-Host "✅ User authenticated" -ForegroundColor Green
}
catch {
    Write-Host "🔐 Please login to Vercel first:" -ForegroundColor Yellow
    Write-Host "   vercel login" -ForegroundColor White
    exit 1
}

# Deploy to Vercel
Write-Host "🔄 Starting deployment..." -ForegroundColor Blue
& vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your Easy Timer app is now live on Vercel!" -ForegroundColor Cyan
