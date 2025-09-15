# 🚀 GitHub Repository Setup Guide

This guide will help you set up the AI Chatbot Widget project on GitHub and deploy it.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js 18+ installed
- Code editor (VS Code recommended)

## 🔧 Step 1: Create GitHub Repository

### Option A: Create Repository on GitHub.com

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository Settings:**
   - **Name**: `ai-chatbot-widget`
   - **Description**: `AI-Powered Chatbot Widget for Fitness Centers - Multi-tenant, multi-language chatbot solution with lead capture and analytics`
   - **Visibility**: Public (or Private if preferred)
   - **Initialize**: Don't check any boxes (we'll push existing code)

4. **Click "Create Repository"**

### Option B: Use GitHub CLI (if installed)

```bash
gh repo create ai-chatbot-widget --public --description "AI-Powered Chatbot Widget for Fitness Centers"
```

## 📁 Step 2: Initialize Local Git Repository

```bash
# Navigate to your project directory
cd C:\sd-webui\ai-widget

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Chatbot Widget for Fitness Centers

- Complete multi-tenant chatbot solution
- Carrera Mistral demo implementation
- Lead capture with Google Sheets integration
- Analytics dashboard and admin panel
- Multi-language support (Turkish/English)
- Voice message support
- WhatsApp integration
- Responsive design with glassmorphism UI"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-widget.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🔑 Step 3: Configure Repository Settings

### Repository Settings
1. **Go to Settings** in your repository
2. **General Settings:**
   - Enable Issues
   - Enable Discussions
   - Enable Wiki (optional)
   - Enable Projects (optional)

3. **Pages Settings** (for GitHub Pages):
   - Go to Pages section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

### Branch Protection Rules
1. **Go to Branches** in Settings
2. **Add rule** for main branch:
   - Require pull request reviews
   - Require status checks
   - Require up-to-date branches

## 🚀 Step 4: Deploy to Vercel (Recommended)

### Option A: Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Import Project:**
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Click "Import"

4. **Configure Environment Variables:**
   ```
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your live URL

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Redeploy with environment variables
vercel --prod
```

## 🌐 Step 5: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Domains"
   - Add your custom domain
   - Configure DNS settings

2. **Update Environment Variables:**
   ```
   NEXTAUTH_URL=https://your-custom-domain.com
   WIDGET_DOMAIN=your-custom-domain.com
   WIDGET_HTTPS=true
   ```

## 📊 Step 6: Set Up Analytics and Monitoring

### GitHub Actions (CI/CD)
Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

### Vercel Analytics
1. **Enable Vercel Analytics** in dashboard
2. **Add analytics code** to your app
3. **Monitor performance** and user behavior

## 🔐 Step 7: Security Configuration

### Environment Variables
- Never commit `.env.local` or `.env` files
- Use Vercel environment variables for production
- Rotate API keys regularly
- Use strong passwords for admin accounts

### Repository Security
1. **Enable 2FA** on GitHub account
2. **Add security policy** (SECURITY.md)
3. **Enable vulnerability alerts**
4. **Regular dependency updates**

## 📈 Step 8: Documentation and Maintenance

### Update README
- Add live demo link
- Update installation instructions
- Add screenshots and GIFs
- Include contribution guidelines

### Regular Maintenance
- Update dependencies monthly
- Monitor error logs
- Review analytics data
- Update documentation

## 🎯 Step 9: Marketing and Promotion

### GitHub Repository
- Add topics/tags for discoverability
- Create a compelling repository description
- Add screenshots to README
- Pin important repositories

### Demo and Showcase
- Create live demo link
- Record demo videos
- Write blog posts
- Share on social media

## 📞 Step 10: Support and Community

### Issue Templates
Create `.github/ISSUE_TEMPLATE/`:
- `bug_report.md`
- `feature_request.md`
- `question.md`

### Discussion Categories
- General
- Q&A
- Ideas
- Show and Tell

## ✅ Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Repository settings configured
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] CI/CD pipeline set up
- [ ] Security measures implemented
- [ ] Documentation updated
- [ ] Community guidelines added

## 🆘 Troubleshooting

### Common Issues

**Push Rejected:**
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

**Environment Variables Not Working:**
- Check variable names match exactly
- Redeploy after adding variables
- Verify no typos in values

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies installed
- Check for TypeScript errors

**Domain Not Working:**
- Verify DNS settings
- Check SSL certificate status
- Wait for DNS propagation (up to 24 hours)

## 📚 Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Git Best Practices](https://git-scm.com/book)

---

**Your AI Chatbot Widget is now live on GitHub! 🎉**

*Share your repository and start building your community!*
