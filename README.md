# 🤖 AI-Powered Chatbot Widget for Fitness Centers

A comprehensive, multi-tenant AI chatbot solution designed specifically for fitness centers and gyms. This project includes a complete demo implementation for Carrera Mistral Fitness with advanced features like lead capture, analytics, admin panel, and multi-language support.

## 🌟 Features

### Core Functionality
- **AI-Powered Conversations**: Intelligent chatbot with context-aware responses
- **Multi-Language Support**: Turkish and English language switching
- **Lead Capture**: Integrated forms with Google Sheets integration
- **Voice Messages**: Speech-to-text functionality for voice input
- **WhatsApp Integration**: Direct messaging with pre-filled lead information
- **Analytics Dashboard**: Comprehensive tracking and reporting
- **Admin Panel**: Full management interface for settings and leads

### Technical Features
- **Multi-Tenant Architecture**: Support for multiple businesses
- **Responsive Design**: Mobile-first approach with glassmorphism UI
- **Real-time Analytics**: Live tracking of user interactions
- **Secure Authentication**: Admin panel with login system
- **API-First Design**: RESTful APIs for all functionality
- **Modern Tech Stack**: Next.js, TypeScript, Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Sheets API (optional, for lead capture)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-chatbot-widget.git
cd ai-chatbot-widget
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure your business settings**
```bash
# Edit configs/tenants/your-business.json
# Update branding, AI prompts, and settings
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
ai-chatbot-widget/
├── 📁 pages/                    # Next.js pages
│   ├── 📁 api/                 # API endpoints
│   │   ├── chat.ts            # Main chat API
│   │   ├── leads.ts           # Lead management
│   │   ├── analytics.ts       # Analytics tracking
│   │   └── 📁 admin/          # Admin panel APIs
│   ├── admin/                 # Admin dashboard
│   ├── install.tsx           # Installation guide
│   └── index.tsx             # Main demo page
├── 📁 public/                 # Static assets
│   ├── widget.js             # Main widget script
│   └── 📁 logos/             # Business logos
├── 📁 configs/               # Configuration files
│   └── 📁 tenants/           # Business configurations
├── 📁 lib/                   # Utility libraries
├── 📁 data/                  # Data storage
│   ├── 📁 analytics/         # Analytics data
│   └── leads.json           # Lead storage
├── 📁 components/            # React components
└── 📄 README.md             # This file
```

## 🎯 Demo Implementation: Carrera Mistral

This repository includes a complete demo implementation for Carrera Mistral Fitness with:

### Branding & Design
- **Colors**: Red and black theme matching Carrera's brand
- **Logo**: Custom Carrera Mistral branding
- **UI**: Modern glassmorphism design with animations
- **Responsive**: Mobile-optimized interface

### Features Implemented
- **Turkish/English Language Support**: Seamless language switching
- **Lead Capture Form**: Name, phone, email, interest, preferred time
- **WhatsApp Integration**: Pre-filled messages with lead data
- **Voice Messages**: Speech-to-text in both languages
- **Quick Actions**: Membership, trial, pricing, contact options
- **Analytics**: Complete user interaction tracking

### Business Configuration
```json
{
  "tenant": "carrera-mistral",
  "brand": {
    "name": "Carrera Canlı Destek Botu",
    "primaryColor": "#dc2626",
    "secondaryColor": "#ef4444"
  },
  "greeting": {
    "en": "Welcome to Carrera Mistral! How can I help you today?",
    "tr": "Carrera Mistral'a hoş geldiniz! Bugün size nasıl yardımcı olabilirim?"
  }
}
```

## 🔧 Configuration

### Business Setup

1. **Create your business configuration**
```bash
# Copy the template
cp configs/tenants/carrera-mistral.json configs/tenants/your-business.json

# Edit your settings
{
  "tenant": "your-business",
  "brand": {
    "name": "Your Business Chatbot",
    "logo": "/logos/your-logo.png",
    "primaryColor": "#your-color",
    "secondaryColor": "#your-secondary-color"
  },
  "greeting": {
    "en": "Welcome to Your Business!",
    "tr": "İşletmenize hoş geldiniz!"
  }
}
```

2. **Update AI prompts**
```json
{
  "ai": {
    "systemPrompt": {
      "en": "You are a helpful assistant for Your Business...",
      "tr": "Sen Your Business için yardımcı bir asistansın..."
    }
  }
}
```

### Environment Variables

```bash
# .env.local
OPENAI_API_KEY=your_openai_api_key
GOOGLE_SHEETS_CREDENTIALS=your_google_credentials
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 📊 Analytics & Reporting

The system includes comprehensive analytics:

### Tracked Events
- **Widget Opens**: When users open the chatbot
- **Messages Sent**: All user interactions
- **Quick Actions**: Button clicks and selections
- **Form Submissions**: Lead capture completions
- **Language Switches**: Language preference changes

### Admin Dashboard
- **Real-time Analytics**: Live user activity
- **Lead Management**: View and manage captured leads
- **Configuration**: Update business settings
- **Reports**: Export analytics data

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 or Lambda deployment

## 📱 Widget Integration

### Basic Integration
```html
<!-- Add to your website -->
<script src="https://yourdomain.com/widget.js"></script>
<script>
  window.AI_WIDGET_CONFIG = {
    tenant: 'your-business',
    position: 'bottom-right',
    theme: 'auto'
  };
</script>
```

### Advanced Integration
```javascript
// Custom configuration
window.AI_WIDGET_CONFIG = {
  tenant: 'your-business',
  position: 'bottom-right',
  theme: 'dark',
  language: 'tr',
  customCSS: 'your-custom-styles.css'
};
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Adding New Features
1. **New API Endpoints**: Add to `pages/api/`
2. **UI Components**: Add to `components/`
3. **Business Logic**: Add to `lib/`
4. **Configuration**: Update tenant configs

## 📈 Business Value

### ROI Calculator
- **Setup Cost**: 20,000 TL (one-time)
- **Monthly Cost**: 3,000 TL
- **Expected ROI**: 300-500% within 6 months
- **Lead Conversion**: 15-25% improvement
- **Customer Engagement**: 40-60% increase

### Key Benefits
- **24/7 Availability**: Never miss a lead
- **Multi-language Support**: Reach more customers
- **Lead Qualification**: Pre-qualify leads automatically
- **Data Collection**: Comprehensive customer insights
- **Cost Reduction**: Reduce manual customer service

## 📞 Support & Documentation

### Documentation
- **Installation Guide**: `pages/install.tsx`
- **API Documentation**: Available in `/api` endpoints
- **Configuration Guide**: See `configs/tenants/` examples

### Support
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: support@yourcompany.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **OpenAI**: For the AI language model
- **Next.js**: For the React framework
- **Tailwind CSS**: For styling
- **Vercel**: For deployment platform

## 📊 Project Status

- ✅ **Core Widget**: Complete
- ✅ **Multi-language**: Complete
- ✅ **Lead Capture**: Complete
- ✅ **Analytics**: Complete
- ✅ **Admin Panel**: Complete
- ✅ **Carrera Demo**: Complete
- 🔄 **Documentation**: In Progress
- 🔄 **Testing**: In Progress

---

**Made with ❤️ for fitness centers worldwide**

*Transform your customer service with AI-powered conversations*