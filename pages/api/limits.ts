import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple rate limiting by IP (in production, use Redis or database)
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // For demo purposes, we'll just return rate limit info
  // In production, implement proper rate limiting with Redis
  const rateLimitInfo = {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
    currentUsage: {
      minute: 0,
      hour: 0,
      day: 0
    },
    limits: {
      messageLength: 1000,
      maxTokens: 4000,
      dailyCostLimit: 10.00 // $10 per day per tenant
    }
  };

  res.status(200).json({
    rateLimits: rateLimitInfo,
    quotas: {
      free: {
        messagesPerMonth: 1000,
        costLimit: 5.00,
        features: ['Basic chat', 'WhatsApp handoff', 'Analytics']
      },
      pro: {
        messagesPerMonth: 10000,
        costLimit: 50.00,
        features: ['Advanced chat', 'Custom branding', 'Priority support', 'API access']
      },
      enterprise: {
        messagesPerMonth: 100000,
        costLimit: 500.00,
        features: ['Unlimited chat', 'White-label', 'Dedicated support', 'Custom integrations']
      }
    }
  });
}
