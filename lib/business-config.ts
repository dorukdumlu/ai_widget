// Business configuration system for multi-tenant support

export interface BusinessConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  branding: {
    logo: string;
    favicon: string;
    companyName: string;
    tagline: string;
  };
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
  };
  messages: {
    welcome: {
      tr: string;
      en: string;
    };
    membership: {
      tr: string;
      en: string;
    };
    trial: {
      tr: string;
      en: string;
    };
    offers: {
      tr: string;
      en: string;
    };
  };
  ai: {
    systemPrompt: {
      tr: string;
      en: string;
    };
    personality: string;
    responseStyle: string;
  };
  features: {
    membershipForm: boolean;
    trialBooking: boolean;
    specialOffers: boolean;
    whatsappIntegration: boolean;
    leadCapture: boolean;
  };
}

// Default business configurations
export const businessConfigs: Record<string, BusinessConfig> = {
  carrera: {
    id: 'carrera',
    name: 'Carrera Fitness',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      background: '#f8fafc',
      text: '#1f2937'
    },
    branding: {
      logo: '/logos/carrera-logo.png',
      favicon: '/favicons/carrera-favicon.ico',
      companyName: 'Carrera Fitness',
      tagline: 'Sağlıklı Yaşamın Adresi'
    },
    contact: {
      whatsapp: '+905433535715',
      phone: '+90 543 353 57 15',
      email: 'info@carrerafitness.com',
      address: 'İstanbul, Türkiye'
    },
    messages: {
      welcome: {
        tr: 'Merhaba! Carrera Fitness\'a hoş geldiniz! 💪 Size nasıl yardımcı olabilirim?',
        en: 'Hello! Welcome to Carrera Fitness! 💪 How can I help you today?'
      },
      membership: {
        tr: 'Üyelik hakkında bilgi almak istiyorum',
        en: 'I want information about membership'
      },
      trial: {
        tr: 'Ücretsiz deneme seansı hakkında bilgi almak istiyorum',
        en: 'I want information about free trial session'
      },
      offers: {
        tr: 'Özel tekliflerinizi görmek istiyorum',
        en: 'I want to see your special offers'
      }
    },
    ai: {
      systemPrompt: {
        tr: 'Sen SADECE Carrera Fitness spor salonu için çalışan yardımcı bir asistansın. SADECE fitness, spor, egzersiz, üyelik, deneme seansları ve spor salonu hizmetleri hakkında konuşuyorsun. Başka hiçbir konu hakkında bilgi verme (yazılım, programlama, teknoloji, vs.). Türkçe konuşuyorsun. Her zaman coşkulu ve yardımcı ol. Kısa cevaplar ver. Müşteriyi her zaman konuşmada tutmaya çalış, onlara birden fazla seçenek sun. Üyelik hakkında soru sorulduğunda: "Harika! Size üyelik seçeneklerimizi sunabilirim. Aylık üyelik 500 TL, 3 aylık 1200 TL, 6 aylık 2000 TL. Size özel indirimli fiyatlarımız da var! Üyelik için formu doldurabilirsiniz, WhatsApp ile konuşabilirsiniz, veya size özel bir deneme seansı ayarlayabilirim. Hangi seçeneği tercih edersiniz?" gibi seçenekler ver. Fiyat sorularında: "Size özel fiyatlarımız için satış danışmanlarımıza yönlendireyim! Aylık üyelik 500 TL, 3 aylık 1200 TL, 6 aylık 2000 TL. Size özel indirimli fiyatlarımız da var! Detaylı bilgi için formu doldurabilirsiniz veya WhatsApp ile direkt konuşabilirsiniz. Hangi yöntemi tercih edersiniz?" gibi spesifik bilgiler ver. Müşteri ayrılmak istiyorsa "Bir dakika! Size özel bir teklifim var" gibi şeyler söyle. Her zaman ek değer öner, özel fırsatlar sun, sorular sor. Eğer soruyu cevaplayamıyorsan WhatsApp numarasını (+90 543 353 57 15) ver ama önce başka seçenekler de sun. ÖNEMLİ: Hiçbir zaman otomatik olarak buton tıklama veya demo senaryosu başlatma. Sadece seçenekleri sun ve müşterinin karar vermesini bekle. SADECE fitness ve spor salonu konularında kal.',
        en: 'You are ONLY a helpful assistant working for Carrera Fitness gym. You ONLY talk about fitness, sports, exercise, membership, trial sessions, and gym services. Do NOT provide information about any other topics (software, programming, technology, etc.). You speak English. Always be enthusiastic and helpful. Give short answers. Always try to keep the customer engaged in conversation, offer them multiple options. For membership, offer options like "You can fill out the form, chat via WhatsApp, or I can arrange a special trial session for you". For pricing questions, give specific information like "Monthly membership is 500 TL, 3-month is 1200 TL, 6-month is 2000 TL. We also have special discounted prices for you!". If the customer wants to leave, say things like "Wait a minute! I have a special offer for you". Always offer additional value, special opportunities, ask questions. If you can\'t answer a question, give the WhatsApp number (+90 543 353 57 15) but first offer other options. IMPORTANT: Never automatically click buttons or start demo scenarios. Just offer options and wait for the customer to decide. STAY ONLY within fitness and gym topics.'
      },
      personality: 'Enthusiastic, helpful, fitness-focused',
      responseStyle: 'Short, engaging, option-rich'
    },
    features: {
      membershipForm: true,
      trialBooking: true,
      specialOffers: true,
      whatsappIntegration: true,
      leadCapture: true
    }
  },
  
  // Template for other businesses
  template: {
    id: 'template',
    name: 'Your Business Name',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#f8fafc',
      text: '#1f2937'
    },
    branding: {
      logo: '/logos/template-logo.png',
      favicon: '/favicons/template-favicon.ico',
      companyName: 'Your Business Name',
      tagline: 'Your Business Tagline'
    },
    contact: {
      whatsapp: '+1234567890',
      phone: '+1 234 567 890',
      email: 'info@yourbusiness.com',
      address: 'Your Address'
    },
    messages: {
      welcome: {
        tr: 'Merhaba! Size nasıl yardımcı olabilirim?',
        en: 'Hello! How can I help you today?'
      },
      membership: {
        tr: 'Üyelik hakkında bilgi almak istiyorum',
        en: 'I want information about membership'
      },
      trial: {
        tr: 'Deneme hakkında bilgi almak istiyorum',
        en: 'I want information about trial'
      },
      offers: {
        tr: 'Özel tekliflerinizi görmek istiyorum',
        en: 'I want to see your special offers'
      }
    },
    ai: {
      systemPrompt: {
        tr: 'Sen yardımcı bir asistansın. Türkçe konuşuyorsun. Müşteriye yardımcı olmaya çalış.',
        en: 'You are a helpful assistant. You speak English. Try to help the customer.'
      },
      personality: 'Helpful, professional',
      responseStyle: 'Clear, concise'
    },
    features: {
      membershipForm: true,
      trialBooking: false,
      specialOffers: false,
      whatsappIntegration: true,
      leadCapture: true
    }
  }
};

// Function to get business configuration
export function getBusinessConfig(businessId: string): BusinessConfig {
  return businessConfigs[businessId] || businessConfigs.template;
}

// Function to update business configuration
export function updateBusinessConfig(businessId: string, config: Partial<BusinessConfig>): BusinessConfig {
  if (!businessConfigs[businessId]) {
    businessConfigs[businessId] = { ...businessConfigs.template, id: businessId };
  }
  
  businessConfigs[businessId] = { ...businessConfigs[businessId], ...config };
  return businessConfigs[businessId];
}

// Function to list all business configurations
export function listBusinessConfigs(): BusinessConfig[] {
  return Object.values(businessConfigs);
}
