import { NextApiRequest, NextApiResponse } from 'next';
import { getBusinessConfig, updateBusinessConfig } from '../../../lib/business-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get business configuration
    const { tenant = 'carrera' } = req.query;
    const config = getBusinessConfig(tenant as string);
    
    return res.status(200).json(config);
  }
  
  if (req.method === 'PUT') {
    // Update business configuration
    const { tenant = 'carrera' } = req.query;
    const updates = req.body;
    
    try {
      const updatedConfig = updateBusinessConfig(tenant as string, updates);
      return res.status(200).json(updatedConfig);
    } catch (error) {
      console.error('Error updating config:', error);
      return res.status(500).json({ error: 'Failed to update configuration' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

