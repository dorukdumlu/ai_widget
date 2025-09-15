<<<<<<< HEAD
﻿# 🤖 AI-Powered Chatbot Widget for Carrera Fitness

A modern, customizable AI chatbot widget designed specifically for fitness centers and gyms, featuring multi-language support, lead capture, and seamless WhatsApp integration.

## 🌟 Features

### 🎯 **Core Functionality**
- **AI-Powered Conversations**: Intelligent responses tailored to fitness industry
- **Multi-Language Support**: Turkish and English with easy language switching
- **Lead Capture**: Comprehensive form with Google Sheets integration
- **WhatsApp Integration**: Pre-filled messages for instant communication
- **Voice Messages**: Speech-to-text functionality for hands-free interaction
- **Real-time Analytics**: Track user interactions and conversion rates

### 🎨 **UI/UX Features**
- **Modern Design**: Red and black gradient theme with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Pulsing chat bubble and smooth transitions
- **Custom Branding**: Easy customization for different businesses
- **Quick Actions**: Pre-defined buttons for common queries

### 🏢 **Business Features**
- **Multi-Tenant Support**: Configure different businesses easily
- **Admin Dashboard**: Manage leads, analytics, and settings
- **Lead Management**: View and export captured leads
- **Usage Analytics**: Detailed insights into user behavior
- **Easy Installation**: Simple widget integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Sheets API (optional, for lead storage)

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

3. **Configure environment**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_SHEETS_CREDENTIALS=your_google_credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
ai-chatbot-widget/
├── components/           # React components
│   ├── ChatBubble.tsx   # Chat bubble component
│   └── ChatWindow.tsx   # Main chat window
├── configs/             # Configuration files
│   ├── tenants/         # Business-specific configs
│   └── *.json          # Language and FAQ configs
├── data/               # Data storage
│   └── analytics/      # Analytics data
├── lib/                # Utility libraries
│   └── business-config.ts
├── pages/              # Next.js pages
│   ├── api/           # API endpoints
│   ├── admin/         # Admin dashboard
│   └── *.tsx          # Main pages
├── public/            # Static assets
│   └── widget.js      # Main widget script
├── styles/            # CSS styles
└── README.md          # This file
```

## ⚙️ Configuration

### Business Configuration
Edit `configs/tenants/carrera-mistral.json` to customize:

```json
{
  "tenant": "carrera-mistral",
  "brand": {
    "name": "Carrera Canlı Destek Botu",
    "logo": "/logos/carrera-mistral.png",
    "primaryColor": "#dc2626",
    "secondaryColor": "#ef4444"
  },
  "greeting": {
    "en": "Welcome to Carrera Mistral!",
    "tr": "Carrera Mistral'a hoş geldiniz!"
  },
  "whatsapp": "+905433535715",
  "faqs": [...],
  "quickActions": [...]
}
```

### Widget Integration
Add to your website:

```html
<!-- Widget Script -->
<script src="https://yourdomain.com/widget.js"></script>
<script>
  window.AI_WIDGET_CONFIG = {
    tenant: 'carrera-mistral',
    vertical: 'gym',
    language: 'tr'
  };
</script>
```

## 🎯 Use Cases

### For Fitness Centers
- **Membership Inquiries**: Handle membership questions and pricing
- **Class Bookings**: Assist with class schedules and reservations
- **Personal Training**: Connect users with personal trainers
- **Trial Sessions**: Schedule free trial sessions
- **General Information**: Provide facility and service information

### For Other Businesses
- **Restaurants**: Menu inquiries, reservations, delivery
- **Retail**: Product information, store hours, locations
- **Services**: Appointment booking, service inquiries
- **Support**: Customer service and FAQ handling

## 📊 Analytics & Reporting

### Tracked Metrics
- **User Interactions**: Opens, messages, quick actions
- **Lead Generation**: Form submissions and conversions
- **Language Usage**: Turkish vs English preferences
- **Response Times**: AI response performance
- **Popular Queries**: Most asked questions

### Admin Dashboard
Access at `/admin` to view:
- Real-time analytics
- Lead management
- Configuration settings
- Usage statistics

## 🔧 API Endpoints

### Chat API
```
POST /api/chat
{
  "message": "User message",
  "lang": "tr",
  "tenant": "carrera-mistral"
}
```

### Leads API
```
POST /api/leads
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "interest": "membership",
  "preferredTime": "morning"
}
```

### Analytics API
```
POST /api/analytics
{
  "event": "message_sent",
  "data": {...}
}
```

## 🌐 Multi-Language Support

### Supported Languages
- **Turkish (tr)**: Primary language for Turkish market
- **English (en)**: International support

### Adding New Languages
1. Create language config in `configs/`
2. Add translations to business config
3. Update widget language switching

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **AWS**: Serverless deployment
- **Docker**: Container deployment

## 📈 Performance

### Optimizations
- **Lazy Loading**: Components load on demand
- **Caching**: API responses cached
- **Compression**: Assets optimized
- **CDN**: Global content delivery

### Metrics
- **Load Time**: < 2 seconds
- **Bundle Size**: < 500KB
- **API Response**: < 1 second
- **Uptime**: 99.9%

## 🔒 Security

### Data Protection
- **No Data Storage**: User data not permanently stored
- **HTTPS Only**: Secure communication
- **Input Validation**: All inputs sanitized
- **Rate Limiting**: API abuse prevention

### Privacy
- **GDPR Compliant**: European privacy standards
- **Data Minimization**: Only necessary data collected
- **User Consent**: Clear privacy notices

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Standards
- **TypeScript**: Type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Jest**: Unit testing

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- **API Docs**: `/api/docs`
- **Widget Guide**: `/install`
- **Admin Guide**: `/admin`

### Contact
- **Email**: support@example.com
- **Issues**: GitHub Issues
- **Discord**: Community Server

## 🎉 Acknowledgments

- **OpenAI**: AI language model
- **Next.js**: React framework
- **Vercel**: Deployment platform
- **Carrera Fitness**: Client and inspiration

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/ai-chatbot-widget)
![GitHub issues](https://img.shields.io/github/issues/yourusername/ai-chatbot-widget)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/ai-chatbot-widget)
![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-chatbot-widget)

---

**Made with ❤️ for the fitness industry**

*Transform your customer experience with AI-powered conversations*
=======
# ai-chatbot-widget
>>>>>>> 6dab337286be654077fa4ef758238eeb93cd0268
