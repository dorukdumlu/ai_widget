import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadsPath = path.join(process.cwd(), 'leads.json');
    
    let leads = [];
    try {
      const data = fs.readFileSync(leadsPath, 'utf8');
      leads = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
      leads = [];
    }
    
    res.status(200).json({ 
      success: true, 
      leads: leads,
      total: leads.length
    });
    
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leads',
      leads: [],
      total: 0
    });
  }
}


