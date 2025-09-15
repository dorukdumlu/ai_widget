import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    // Simple authentication (in production, use proper auth)
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({ 
        success: true, 
        token: 'demo-token-123' // In production, generate secure JWT
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

