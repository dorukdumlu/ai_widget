import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, interest, preferredTime, businessId = 'carrera' } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
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
        new Date().toISOString(), // Timestamp
        businessId, // Business ID
        name,
        phone,
        email,
        interest || '',
        preferredTime || '',
        'Chatbot', // Source
        'Active' // Status
      ]
    ];

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:I', // Assuming you have a 'Leads' sheet with columns A-I
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Lead saved to Google Sheets:', response.data);

    return res.status(200).json({ 
      success: true, 
      message: 'Lead saved successfully',
      updatedRows: response.data.updates?.updatedRows 
    });

  } catch (error) {
    console.error('Error saving lead to Google Sheets:', error);
    return res.status(500).json({ 
      error: 'Failed to save lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

