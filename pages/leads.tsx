import { useState, useEffect } from 'react';
import Head from 'next/head';

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
  savedAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInterestLabel = (interest: string, language: string) => {
    const labels = {
      membership: language === 'tr' ? 'Üyelik' : 'Membership',
      personal_training: language === 'tr' ? 'Kişisel Antrenman' : 'Personal Training',
      classes: language === 'tr' ? 'Grup Dersleri' : 'Group Classes',
      spa: language === 'tr' ? 'SPA Hizmetleri' : 'SPA Services',
      nutrition: language === 'tr' ? 'Beslenme Danışmanlığı' : 'Nutrition Counseling'
    };
    return labels[interest] || interest;
  };

  const getTimeLabel = (time: string, language: string) => {
    const labels = {
      morning: language === 'tr' ? 'Sabah (07:00-12:00)' : 'Morning (07:00-12:00)',
      afternoon: language === 'tr' ? 'Öğleden Sonra (12:00-17:00)' : 'Afternoon (12:00-17:00)',
      evening: language === 'tr' ? 'Akşam (17:00-22:00)' : 'Evening (17:00-22:00)',
      flexible: language === 'tr' ? 'Esnek' : 'Flexible'
    };
    return labels[time] || time;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Carrera Mistral - Captured Leads</title>
        <meta name="description" content="View all captured leads from the AI chatbot" />
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">📊 Captured Leads</h1>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">{leads.length}</p>
              <p className="text-sm text-gray-500">Total Leads</p>
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads yet</h3>
              <p className="text-gray-500">Leads will appear here when users fill out the form</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">ID: {lead.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.phone}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {getInterestLabel(lead.interest, lead.language)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTimeLabel(lead.preferredTime, lead.language)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {lead.language.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lead.savedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              ← Back to Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


