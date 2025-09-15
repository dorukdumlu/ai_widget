import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  preferredTime: string;
  language: string;
  timestamp: string;
  source: string;
  status: string;
  savedAt: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read leads from file
    const leadsPath = path.join(process.cwd(), 'leads.json');
    let leads: Lead[] = [];
    
    if (fs.existsSync(leadsPath)) {
      const fileContent = fs.readFileSync(leadsPath, 'utf8');
      leads = JSON.parse(fileContent);
    }
    
    // Sort by timestamp (newest first)
    leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return res.status(200).json(leads);
    
  } catch (error) {
    console.error('Error loading leads:', error);
    return res.status(500).json({ error: 'Failed to load leads' });
  }
}

