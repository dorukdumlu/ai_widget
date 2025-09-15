import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';

interface UsageLog {
  timestamp: string;
  tenant: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const logFile = path.join(process.cwd(), 'usage-logs.json');
    let logs: UsageLog[] = [];
    
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
    }

    // Calculate stats
    const totalMessages = logs.length;
    const totalCost = logs.reduce((sum, log) => sum + log.cost, 0);
    const totalTokens = logs.reduce((sum, log) => sum + log.inputTokens + log.outputTokens, 0);
    
    // Group by tenant
    const tenantStats = logs.reduce((acc, log) => {
      if (!acc[log.tenant]) {
        acc[log.tenant] = { messages: 0, cost: 0, tokens: 0 };
      }
      acc[log.tenant].messages++;
      acc[log.tenant].cost += log.cost;
      acc[log.tenant].tokens += log.inputTokens + log.outputTokens;
      return acc;
    }, {} as Record<string, { messages: number; cost: number; tokens: number }>);

    // Recent activity (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = logs.filter(log => new Date(log.timestamp) > yesterday);
    
    res.status(200).json({
      totalMessages,
      totalCost: Math.round(totalCost * 10000) / 10000, // Round to 4 decimal places
      totalTokens,
      tenantStats,
      recentActivity: recentLogs.length,
      averageCostPerMessage: totalMessages > 0 ? Math.round((totalCost / totalMessages) * 10000) / 10000 : 0,
      logs: logs.slice(-50) // Last 50 messages
    });
  } catch (error) {
    console.error('Error reading usage logs:', error);
    res.status(500).json({ error: 'Failed to read usage data' });
  }
}
