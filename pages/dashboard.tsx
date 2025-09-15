export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrera Mistral - AI Widget Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Messages</h3>
            <p className="text-3xl font-bold text-blue-600" id="total-messages">-</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Cost</h3>
            <p className="text-3xl font-bold text-green-600" id="total-cost">-</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tokens</h3>
            <p className="text-3xl font-bold text-purple-600" id="total-tokens">-</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h3>
            <p className="text-3xl font-bold text-orange-600" id="recent-activity">-</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Cost per Message</h3>
            <p className="text-2xl font-bold text-gray-900" id="avg-cost">-</p>
            <p className="text-sm text-gray-500 mt-2">Average cost per conversation</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Messages</h3>
            <div id="recent-messages" className="space-y-2 max-h-64 overflow-y-auto">
              <p className="text-gray-500">Loading...</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Live Demo</h3>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Chat Widget
            </a>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          async function loadDashboard() {
            try {
              const response = await fetch('/api/usage');
              const data = await response.json();
              
              document.getElementById('total-messages').textContent = data.totalMessages || 0;
              document.getElementById('total-cost').textContent = '$' + (data.totalCost || 0).toFixed(4);
              document.getElementById('total-tokens').textContent = (data.totalTokens || 0).toLocaleString();
              document.getElementById('recent-activity').textContent = data.recentActivity || 0;
              document.getElementById('avg-cost').textContent = '$' + (data.averageCostPerMessage || 0).toFixed(4);
              
              const recentMessages = document.getElementById('recent-messages');
              if (data.logs && data.logs.length > 0) {
                recentMessages.innerHTML = data.logs.slice(-10).map(log => 
                  '<div class="text-sm border-b pb-2 mb-2">' +
                  '<div class="font-medium">' + new Date(log.timestamp).toLocaleString() + '</div>' +
                  '<div class="text-gray-600">' + log.message + '</div>' +
                  '<div class="text-xs text-gray-400">Cost: $' + log.cost.toFixed(4) + ' | Tokens: ' + (log.inputTokens + log.outputTokens) + '</div>' +
                  '</div>'
                ).join('');
              } else {
                recentMessages.innerHTML = '<p class="text-gray-500">No messages yet</p>';
              }
            } catch (error) {
              console.error('Error loading dashboard:', error);
            }
          }
          
          loadDashboard();
          setInterval(loadDashboard, 30000); // Refresh every 30 seconds
        `
      }} />
    </div>
  );
}
