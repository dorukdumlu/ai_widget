import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { getBusinessConfig } from '../../lib/business-config';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Token costs (per 1K tokens)
const TOKEN_COSTS = {
  'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
  'gpt-4o': { input: 0.005, output: 0.015 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 }
};

interface UsageLog {
  timestamp: string;
  tenant: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  message: string;
}

function logUsage(tenant: string, model: string, inputTokens: number, outputTokens: number, message: string) {
  const costs = TOKEN_COSTS[model as keyof typeof TOKEN_COSTS] || TOKEN_COSTS['gpt-4o-mini'];
  const cost = (inputTokens / 1000) * costs.input + (outputTokens / 1000) * costs.output;
  
  const usage: UsageLog = {
    timestamp: new Date().toISOString(),
    tenant,
    model,
    inputTokens,
    outputTokens,
    cost,
    message: message.substring(0, 100)
  };
  
  console.log('[USAGE]', JSON.stringify(usage));
  
  const logFile = path.join(process.cwd(), 'usage-logs.json');
  let logs: UsageLog[] = [];
  try {
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
    }
  } catch (error) {
    // File doesn't exist or is invalid, start fresh
  }
  
  logs.push(usage);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
}

async function callOpenAI(messages: Array<{role: string, content: string}>, model: string, stream: boolean = false) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      stream
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  return response;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, vertical = 'gym', lang = 'en', tenant = 'carrera', stream = false } = (req.body || {}) as {
    message?: string;
    vertical?: string;
    lang?: string;
    tenant?: string;
    stream?: boolean;
  };

  const startTime = Date.now();
  const primaryModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const fallbackModel = 'gpt-3.5-turbo';

  try {
    // Get business configuration
    const businessConfig = getBusinessConfig(tenant);
    const systemPrompt = lang === 'tr' ? businessConfig.ai.systemPrompt.tr : businessConfig.ai.systemPrompt.en;
    
    console.log('🔧 Business Config:', businessConfig.name);
    console.log('🔧 System Prompt (first 200 chars):', systemPrompt.substring(0, 200));
    console.log('🔧 Message:', message);
    
    // Check if the message is about non-fitness topics and redirect
    const nonFitnessKeywords = ['yazılım', 'programlama', 'kod', 'software', 'programming', 'code', 'teknoloji', 'technology', 'bilgisayar', 'computer'];
    const isNonFitnessTopic = nonFitnessKeywords.some(keyword => 
      message?.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (isNonFitnessTopic) {
      const redirectMessage = lang === 'tr' 
        ? 'Üzgünüm, ben sadece Carrera Fitness spor salonu hakkında yardımcı olabilirim. Fitness, egzersiz, üyelik veya deneme seansları hakkında sorularınız var mı?'
        : 'Sorry, I can only help with Carrera Fitness gym services. Do you have any questions about fitness, exercise, membership, or trial sessions?';
      
      return res.status(200).json({ 
        reply: redirectMessage,
        model: 'redirect',
        usage: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          responseTime: Date.now() - startTime,
          cost: 0
        }
      });
    }
    
    const messages = [
      { 
        role: 'system', 
        content: systemPrompt
      },
      { role: 'user', content: message || (lang === 'tr' ? businessConfig.messages.welcome.tr : businessConfig.messages.welcome.en) },
    ];

    let response;
    let modelUsed = primaryModel;

    try {
      // Try primary model first
      response = await callOpenAI(messages, primaryModel, stream);
    } catch (error) {
      console.warn('Primary model failed, trying fallback:', error);
      try {
        // Try fallback model
        response = await callOpenAI(messages, fallbackModel, stream);
        modelUsed = fallbackModel;
      } catch (fallbackError) {
        console.error('Both models failed:', fallbackError);
        return res.status(500).json({ 
          error: 'AI service unavailable', 
          detail: 'Both primary and fallback models are unavailable' 
        });
      }
    }

    if (stream) {
      // Handle streaming response
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      const reader = response.body?.getReader();
      if (!reader) {
        return res.status(500).json({ error: 'No response body' });
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          res.write(chunk);
        }
        res.end();
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        res.end();
      }
      return;
    }

    // Handle non-streaming response
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      };
    };
    
    const content = data.choices?.[0]?.message?.content || '';
    const usage = data.usage;
    
    // Log usage for cost tracking
    if (usage) {
      logUsage(
        tenant || 'default',
        modelUsed,
        usage.prompt_tokens,
        usage.completion_tokens,
        message || ''
      );
    }
    
    const responseTime = Date.now() - startTime;
    
    return res.status(200).json({ 
      reply: content,
      model: modelUsed,
      usage: {
        inputTokens: usage?.prompt_tokens || 0,
        outputTokens: usage?.completion_tokens || 0,
        totalTokens: usage?.total_tokens || 0,
        responseTime: responseTime,
        cost: usage ? (usage.prompt_tokens / 1000) * TOKEN_COSTS[modelUsed as keyof typeof TOKEN_COSTS].input + (usage.completion_tokens / 1000) * TOKEN_COSTS[modelUsed as keyof typeof TOKEN_COSTS].output : 0
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Server error:', message);
    return res.status(500).json({ error: 'Server error', detail: message });
  }
}
