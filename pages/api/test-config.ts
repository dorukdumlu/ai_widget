import { NextApiRequest, NextApiResponse } from 'next';
import { getBusinessConfig } from '../../lib/business-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tenant = 'carrera', lang = 'tr' } = req.query;
  
  const businessConfig = getBusinessConfig(tenant as string);
  const systemPrompt = lang === 'tr' ? businessConfig.ai.systemPrompt.tr : businessConfig.ai.systemPrompt.en;
  
  res.status(200).json({
    businessConfig: {
      name: businessConfig.name,
      id: businessConfig.id
    },
    systemPrompt: systemPrompt.substring(0, 200) + '...',
    fullSystemPrompt: systemPrompt
  });
}

