# GitHub Upload Script for AI Chatbot Widget
# This script will initialize git, add all files, and push to GitHub

Write-Host "🚀 Starting GitHub Upload Process..." -ForegroundColor Green

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (Test-Path ".git") {
    Write-Host "✅ Already in a git repository" -ForegroundColor Green
} else {
    Write-Host "📁 Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "📦 Adding files to git..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: AI Chatbot Widget for Carrera Fitness

Features:
- Multi-language support (Turkish/English)
- Lead capture with Google Sheets integration
- WhatsApp integration
- Voice message support
- Admin dashboard
- Real-time analytics
- Responsive design
- Multi-tenant configuration

Ready for production deployment!"
    
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No changes to commit" -ForegroundColor Blue
}

# Check if remote origin exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote origin already exists: $remote" -ForegroundColor Green
} else {
    Write-Host "🔗 Please add your GitHub repository as remote origin:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then run this script again to push your code." -ForegroundColor Yellow
    exit 0
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    try {
        git push -u origin master
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to push to GitHub. Please check your credentials and repository URL." -ForegroundColor Red
        Write-Host "You may need to:" -ForegroundColor Yellow
        Write-Host "1. Set up GitHub authentication" -ForegroundColor Yellow
        Write-Host "2. Check your repository URL" -ForegroundColor Yellow
        Write-Host "3. Ensure you have push permissions" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎉 GitHub upload process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit your GitHub repository" -ForegroundColor White
Write-Host "2. Set up GitHub Pages or deploy to Vercel" -ForegroundColor White
Write-Host "3. Configure environment variables" -ForegroundColor White
Write-Host "4. Test the deployment" -ForegroundColor White
Write-Host ""
Write-Host "For deployment help, check the README.md file." -ForegroundColor Blue
