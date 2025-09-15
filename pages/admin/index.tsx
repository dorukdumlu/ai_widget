import { useState, useEffect } from 'react';
import Head from 'next/head';

interface BusinessConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  branding: {
    logo: string;
    favicon: string;
    companyName: string;
    tagline: string;
  };
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
  };
  messages: {
    welcome: {
      tr: string;
      en: string;
    };
    membership: {
      tr: string;
      en: string;
    };
    trial: {
      tr: string;
      en: string;
    };
    offers: {
      tr: string;
      en: string;
    };
  };
  ai: {
    systemPrompt: {
      tr: string;
      en: string;
    };
    personality: string;
    responseStyle: string;
  };
  features: {
    membershipForm: boolean;
    trialBooking: boolean;
    specialOffers: boolean;
    whatsappIntegration: boolean;
    leadCapture: boolean;
  };
}

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
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load business configuration
      const configResponse = await fetch('/api/admin/config');
      const configData = await configResponse.json();
      setBusinessConfig(configData);

      // Load leads
      const leadsResponse = await fetch('/api/admin/leads');
      const leadsData = await leadsResponse.json();
      setLeads(leadsData);

      // Load analytics
      const analyticsResponse = await fetch('/api/admin/analytics');
      const analyticsData = await analyticsResponse.json();
      setAnalytics(analyticsData);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const updateBusinessConfig = async (updatedConfig: Partial<BusinessConfig>) => {
    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig)
      });
      
      if (response.ok) {
        setBusinessConfig({ ...businessConfig, ...updatedConfig } as BusinessConfig);
        alert('Configuration updated successfully!');
      }
    } catch (error) {
      console.error('Error updating config:', error);
      alert('Error updating configuration');
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Name', 'Phone', 'Email', 'Interest', 'Preferred Time', 'Language', 'Date', 'Status'],
      ...leads.map(lead => [
        lead.name,
        lead.phone,
        lead.email,
        lead.interest,
        lead.preferredTime,
        lead.language,
        new Date(lead.timestamp).toLocaleDateString(),
        lead.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Widget Admin Dashboard</title>
        <meta name="description" content="Manage your AI chatbot widget" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Widget Admin</h1>
              <p className="text-sm text-gray-500">Manage your chatbot and leads</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {businessConfig?.name || 'Loading...'}
              </span>
              <button
                onClick={exportLeads}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Export Leads
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'leads', name: 'Leads', icon: '👥' },
              { id: 'config', name: 'Configuration', icon: '⚙️' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
              { id: 'settings', name: 'Settings', icon: '🔧' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Leads</p>
                    <p className="text-2xl font-semibold text-gray-900">{leads.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">This Month</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {leads.filter(lead => 
                        new Date(lead.timestamp) > new Date(new Date().setMonth(new Date().getMonth() - 1))
                      ).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">12.5%</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Chats</p>
                  <p className="text-2xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Leads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.slice(0, 5).map(lead => (
                      <tr key={lead.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.interest || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Lead Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={exportLeads}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={loadData}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`tel:${lead.phone}`} className="text-blue-600 hover:text-blue-800">
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-800">
                            {lead.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.interest || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.preferredTime || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.language.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && businessConfig && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Configuration</h2>
            
            {/* Basic Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={businessConfig.name}
                    onChange={(e) => updateBusinessConfig({ name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={businessConfig.branding.companyName}
                    onChange={(e) => updateBusinessConfig({ 
                      branding: { ...businessConfig.branding, companyName: e.target.value }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <input
                    type="text"
                    value={businessConfig.contact.whatsapp}
                    onChange={(e) => updateBusinessConfig({ 
                      contact: { ...businessConfig.contact, whatsapp: e.target.value }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={businessConfig.contact.phone}
                    onChange={(e) => updateBusinessConfig({ 
                      contact: { ...businessConfig.contact, phone: e.target.value }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={businessConfig.contact.email}
                    onChange={(e) => updateBusinessConfig({ 
                      contact: { ...businessConfig.contact, email: e.target.value }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={businessConfig.contact.address}
                    onChange={(e) => updateBusinessConfig({ 
                      contact: { ...businessConfig.contact, address: e.target.value }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* AI Settings */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">AI Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Turkish System Prompt</label>
                  <textarea
                    rows={6}
                    value={businessConfig.ai.systemPrompt.tr}
                    onChange={(e) => updateBusinessConfig({ 
                      ai: { 
                        ...businessConfig.ai, 
                        systemPrompt: { 
                          ...businessConfig.ai.systemPrompt, 
                          tr: e.target.value 
                        }
                      }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">English System Prompt</label>
                  <textarea
                    rows={6}
                    value={businessConfig.ai.systemPrompt.en}
                    onChange={(e) => updateBusinessConfig({ 
                      ai: { 
                        ...businessConfig.ai, 
                        systemPrompt: { 
                          ...businessConfig.ai.systemPrompt, 
                          en: e.target.value 
                        }
                      }
                    })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
            
            {analytics ? (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Events</p>
                        <p className="text-2xl font-semibold text-gray-900">{analytics.totalEvents}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                        <p className="text-2xl font-semibold text-gray-900">{analytics.totalSessions}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <span className="text-2xl">📈</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                        <p className="text-2xl font-semibold text-gray-900">{analytics.metrics?.conversionRate}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Lead Submissions</p>
                        <p className="text-2xl font-semibold text-gray-900">{analytics.metrics?.leadSubmissions}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Types */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(analytics.eventsByType || {}).map(([event, count]) => (
                      <div key={event} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-semibold text-gray-900">{count as number}</p>
                        <p className="text-sm text-gray-500 capitalize">{event.replace(/_/g, ' ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Distribution */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(analytics.languageStats || {}).map(([lang, count]) => (
                      <div key={lang} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-semibold text-gray-900">{count as number}</p>
                        <p className="text-sm text-gray-500 uppercase">{lang}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analytics.recentEvents?.slice(0, 10).map((event: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {event.event.replace(/_/g, ' ')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                              {event.language}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.sessionId?.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">Loading analytics data...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
