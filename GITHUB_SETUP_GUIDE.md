# 🚀 GitHub Setup Guide

This guide will help you upload your AI Chatbot Widget project to GitHub.

## 📋 Prerequisites

1. **Git installed** on your computer
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`

2. **GitHub account** created
   - Sign up at: https://github.com
   - Verify email address

## 🔧 Setup Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-chatbot-widget` (or your preferred name)
3. Description: `AI-Powered Chatbot Widget for Fitness Centers`
4. Set to **Public** (recommended) or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Get Repository URL

After creating the repository, GitHub will show you the URL. It looks like:
```
https://github.com/YOUR_USERNAME/ai-chatbot-widget.git
```

### Step 3: Configure Git (First Time Only)

If this is your first time using Git on this computer:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Upload Project

#### Option A: Using the Upload Scripts (Recommended)

**For Windows (PowerShell):**
```powershell
.\upload_to_github.ps1
```

**For Windows (Command Prompt):**
```cmd
upload_to_github.bat
```

#### Option B: Manual Upload

1. **Initialize Git:**
   ```bash
   git init
   ```

2. **Add Remote Repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-widget.git
   ```

3. **Add All Files:**
   ```bash
   git add .
   ```

4. **Commit Changes:**
   ```bash
   git commit -m "Initial commit: AI Chatbot Widget for Carrera Fitness"
   ```

5. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

## 🔐 Authentication

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`, `write:packages`
4. Copy the token
5. Use token as password when prompted

### Option 2: SSH Key

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Add to GitHub Settings → SSH and GPG keys

## 📁 Project Structure

Your project will be organized as:

```
ai-chatbot-widget/
├── 📄 README.md                 # Project documentation
├── 📄 .gitignore               # Git ignore rules
├── 📄 package.json             # Node.js dependencies
├── 📄 next.config.ts           # Next.js configuration
├── 📁 components/              # React components
├── 📁 configs/                 # Configuration files
├── 📁 data/                    # Data storage
├── 📁 lib/                     # Utility libraries
├── 📁 pages/                   # Next.js pages
├── 📁 public/                  # Static assets
├── 📁 styles/                  # CSS styles
├── 📄 upload_to_github.ps1     # PowerShell upload script
└── 📄 upload_to_github.bat     # Batch upload script
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `GOOGLE_SHEETS_CREDENTIALS`
4. Deploy automatically

### Option 2: Netlify

1. Go to https://netlify.com
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `out`
5. Deploy

### Option 3: GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` or `master`
4. Folder: `/ (root)`
5. Save

## 🔧 Environment Variables

Create a `.env.local` file (not committed to Git):

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Sheets (Optional)
GOOGLE_SHEETS_CREDENTIALS=your_google_credentials_here

# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📊 Repository Features

### GitHub Actions (CI/CD)
- Automatic testing on pull requests
- Automatic deployment on main branch
- Code quality checks

### Issues & Discussions
- Bug reports
- Feature requests
- Community discussions

### Wiki
- Detailed documentation
- API reference
- Configuration guides

## 🎯 Next Steps After Upload

1. **Set up GitHub Pages** for documentation
2. **Configure GitHub Actions** for CI/CD
3. **Add collaborators** if working in team
4. **Set up branch protection** rules
5. **Create releases** for version management

## 🆘 Troubleshooting

### Common Issues

**"Repository not found"**
- Check repository URL
- Verify you have access
- Check authentication

**"Authentication failed"**
- Use Personal Access Token
- Check username/password
- Verify 2FA settings

**"Push rejected"**
- Pull latest changes first
- Check branch name (main vs master)
- Verify permissions

**"Large file"**
- Check .gitignore
- Use Git LFS for large files
- Remove unnecessary files

### Getting Help

- Check GitHub documentation
- Search existing issues
- Create new issue with details
- Contact support

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Documentation](https://docs.github.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)

---

**Happy coding! 🎉**

*Your AI Chatbot Widget is now ready for the world to see!*
