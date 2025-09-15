import { useState } from 'react';
import Head from 'next/head';

export default function InstallGuide() {
  const [selectedBusiness, setSelectedBusiness] = useState('carrera');
  const [selectedLanguage, setSelectedLanguage] = useState('tr');
  const [selectedVertical, setSelectedVertical] = useState('gym');

  const generateCode = () => {
    return `<!-- AI Widget Installation Code -->
<script>
  window.AI_WIDGET_TENANT = '${selectedBusiness}';
  window.AI_WIDGET_LANG = '${selectedLanguage}';
  window.AI_WIDGET_VERTICAL = '${selectedVertical}';
</script>
<script src="${window.location.origin}/widget.js"></script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Install AI Widget</title>
        <meta name="description" content="Install your AI chatbot widget" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Install AI Widget</h1>
          
          <div className="space-y-6">
            {/* Configuration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business</label>
                  <select
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="carrera">Carrera Fitness</option>
                    <option value="template">Template Business</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="tr">Turkish</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vertical</label>
                  <select
                    value={selectedVertical}
                    onChange={(e) => setSelectedVertical(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="gym">Gym/Fitness</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Installation Code</h3>
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Copy Code
                </button>
              </div>
              
              <pre className="text-sm overflow-x-auto">
                <code>{generateCode()}</code>
              </pre>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Installation Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>Copy the code above</li>
                <li>Paste it before the closing <code>&lt;/body&gt;</code> tag of your website</li>
                <li>Save and publish your website</li>
                <li>The AI widget will appear in the bottom-right corner</li>
                <li>Test the widget to ensure it's working correctly</li>
              </ol>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">Widget will appear here on your website</p>
                <div className="inline-block">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                    💬
                  </div>
                  <p className="text-sm text-gray-600 mt-2">AI Chat Widget</p>
                </div>
              </div>
            </div>

            {/* Admin Access */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Admin Access</h3>
              <p className="text-yellow-800 mb-2">
                To manage your widget and view leads, visit:
              </p>
              <a 
                href="/admin/login" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {window.location.origin}/admin/login
              </a>
              <p className="text-sm text-yellow-700 mt-2">
                Demo credentials: admin / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

