import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  interest: string;
  preferredTime: string;
  language: string;
  timestamp: string;
  source: string;
}

// Function to save lead to Google Sheets
async function saveToGoogleSheets(leadData: LeadData) {
  try {
    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL) {
      console.log('⚠️ Google Sheets not configured, skipping...');
      return { success: false, message: 'Google Sheets not configured' };
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Prepare the data to insert
    const values = [
      [
        leadData.timestamp, // Timestamp
        'carrera', // Business ID
        leadData.name,
        leadData.phone,
        leadData.email,
        leadData.interest || '',
        leadData.preferredTime || '',
        leadData.source,
        'Active' // Status
      ]
    ];

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:I',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('✅ Lead saved to Google Sheets:', response.data);
    return { success: true, message: 'Saved to Google Sheets' };

  } catch (error) {
    console.error('❌ Error saving to Google Sheets:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: LeadData = req.body;
    
    // Add unique ID and timestamp
    const leadWithId = {
      ...leadData,
      id: `LEAD_${Date.now()}`,
      savedAt: new Date().toISOString()
    };
    
    // Read existing leads
    const leadsPath = path.join(process.cwd(), 'leads.json');
    let leads = [];
    
    try {
      const existingData = fs.readFileSync(leadsPath, 'utf8');
      leads = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      leads = [];
    }
    
    // Add new lead
    leads.push(leadWithId);
    
    // Save back to file
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
    
    console.log('✅ New lead saved to file:', leadWithId);
    console.log('📊 Total leads:', leads.length);
    
    // Also save to Google Sheets (if configured)
    const googleSheetsResult = await saveToGoogleSheets(leadData);
    if (googleSheetsResult.success) {
      console.log('✅ Lead also saved to Google Sheets');
    } else {
      console.log('⚠️ Google Sheets save failed:', googleSheetsResult.message);
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: leadData.language === 'tr' 
        ? 'Bilgileriniz başarıyla kaydedildi!' 
        : 'Your information has been saved successfully!',
      leadId: leadWithId.id,
      totalLeads: leads.length
    });
    
  } catch (error) {
    console.error('❌ Error saving lead:', error);
    res.status(500).json({ 
      error: 'Failed to save lead',
      message: req.body.language === 'tr' 
        ? 'Bir hata oluştu, lütfen tekrar deneyin.' 
        : 'An error occurred, please try again.'
    });
  }
}
