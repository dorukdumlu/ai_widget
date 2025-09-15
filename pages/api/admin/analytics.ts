import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface AnalyticsData {
  event: string;
  meta?: Record<string, any>;
  timestamp: string;
  userAgent: string;
  language: string;
  tenant: string;
  sessionId: string;
  ip?: string;
  referer?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const analyticsDir = path.join(process.cwd(), 'data', 'analytics');
    
    if (!fs.existsSync(analyticsDir)) {
      return res.status(200).json({
        totalEvents: 0,
        eventsByType: {},
        dailyStats: [],
        languageStats: {},
        sessionStats: {},
        recentEvents: []
      });
    }

    // Get all analytics files
    const files = fs.readdirSync(analyticsDir).filter(file => file.startsWith('analytics_') && file.endsWith('.json'));
    
    let allEvents: AnalyticsData[] = [];
    
    // Read all analytics files
    for (const file of files) {
      try {
        const filePath = path.join(analyticsDir, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        allEvents = allEvents.concat(fileData);
      } catch (e) {
        console.log('Error reading analytics file:', file, e);
      }
    }

    // Process analytics data
    const totalEvents = allEvents.length;
    
    // Events by type
    const eventsByType: Record<string, number> = {};
    allEvents.forEach(event => {
      eventsByType[event.event] = (eventsByType[event.event] || 0) + 1;
    });

    // Language statistics
    const languageStats: Record<string, number> = {};
    allEvents.forEach(event => {
      languageStats[event.language] = (languageStats[event.language] || 0) + 1;
    });

    // Session statistics
    const sessionStats: Record<string, any> = {};
    const uniqueSessions = new Set();
    allEvents.forEach(event => {
      uniqueSessions.add(event.sessionId);
      if (!sessionStats[event.sessionId]) {
        sessionStats[event.sessionId] = {
          sessionId: event.sessionId,
          firstEvent: event.timestamp,
          lastEvent: event.timestamp,
          eventCount: 0,
          events: []
        };
      }
      sessionStats[event.sessionId].eventCount++;
      sessionStats[event.sessionId].lastEvent = event.timestamp;
      sessionStats[event.sessionId].events.push(event);
    });

    // Daily statistics
    const dailyStats: Record<string, any> = {};
    allEvents.forEach(event => {
      const date = event.timestamp.split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          totalEvents: 0,
          uniqueSessions: new Set(),
          eventsByType: {},
          languageStats: {}
        };
      }
      dailyStats[date].totalEvents++;
      dailyStats[date].uniqueSessions.add(event.sessionId);
      dailyStats[date].eventsByType[event.event] = (dailyStats[date].eventsByType[event.event] || 0) + 1;
      dailyStats[date].languageStats[event.language] = (dailyStats[date].languageStats[event.language] || 0) + 1;
    });

    // Convert daily stats to array and convert sets to counts
    const dailyStatsArray = Object.values(dailyStats).map((day: any) => ({
      ...day,
      uniqueSessions: day.uniqueSessions.size
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Recent events (last 50)
    const recentEvents = allEvents
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);

    // Calculate conversion rates
    const totalSessions = uniqueSessions.size;
    const leadSubmissions = eventsByType['lead_form_submitted'] || 0;
    const chatOpens = eventsByType['open'] || 0;
    const messageExchanges = eventsByType['message_exchanged'] || 0;
    const quickActionClicks = eventsByType['quick_action_clicked'] || 0;

    const conversionRate = totalSessions > 0 ? (leadSubmissions / totalSessions * 100).toFixed(2) : '0.00';
    const engagementRate = totalSessions > 0 ? (messageExchanges / totalSessions).toFixed(2) : '0.00';

    return res.status(200).json({
      totalEvents,
      totalSessions,
      eventsByType,
      languageStats,
      sessionStats: Object.values(sessionStats),
      dailyStats: dailyStatsArray,
      recentEvents,
      metrics: {
        conversionRate: parseFloat(conversionRate),
        engagementRate: parseFloat(engagementRate),
        averageEventsPerSession: totalSessions > 0 ? (totalEvents / totalSessions).toFixed(2) : '0.00',
        leadSubmissions,
        chatOpens,
        messageExchanges,
        quickActionClicks
      }
    });

  } catch (error) {
    console.error('Analytics dashboard error:', error);
    return res.status(500).json({ error: 'Failed to load analytics data' });
  }
}

