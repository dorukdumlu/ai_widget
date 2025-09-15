import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface AnalyticsEvent {
  event: string;
  meta?: Record<string, any>;
  timestamp: string;
  userAgent: string;
  language: string;
  tenant: string;
  sessionId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as AnalyticsEvent;
  if (!body || !body.event) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try {
    // Create analytics directory if it doesn't exist
    const analyticsDir = path.join(process.cwd(), 'data', 'analytics');
    if (!fs.existsSync(analyticsDir)) {
      fs.mkdirSync(analyticsDir, { recursive: true });
    }

    // Generate session ID if not provided
    const sessionId = body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Enhanced analytics data
    const analyticsData = {
      ...body,
      sessionId,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      referer: req.headers.referer,
      userAgent: body.userAgent || req.headers['user-agent'],
      timestamp: body.timestamp || new Date().toISOString()
    };

    // Save to daily analytics file
    const today = new Date().toISOString().split('T')[0];
    const analyticsFile = path.join(analyticsDir, `analytics_${today}.json`);
    
    let existingData = [];
    if (fs.existsSync(analyticsFile)) {
      try {
        existingData = JSON.parse(fs.readFileSync(analyticsFile, 'utf8'));
      } catch (e) {
        console.log('Error reading analytics file:', e);
      }
    }
    
    existingData.push(analyticsData);
    fs.writeFileSync(analyticsFile, JSON.stringify(existingData, null, 2));

    // Log to console for debugging
    console.log('[analytics]', {
      event: body.event,
      tenant: body.tenant,
      language: body.language,
      timestamp: analyticsData.timestamp,
      sessionId
    });

    return res.status(200).json({ 
      ok: true, 
      sessionId,
      message: 'Analytics event recorded successfully' 
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Failed to record analytics event' });
  }
}
