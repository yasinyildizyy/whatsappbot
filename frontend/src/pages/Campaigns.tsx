import { useState } from 'react';
import { HiPlay, HiPause, HiRefresh } from 'react-icons/hi';

export default function Campaigns() {
  const [campaign, setCampaign] = useState({
    name: '',
    message: '',
    numbers: ''
  });

  const [stats] = useState({
    total: 1250,
    sent: 850,
    failed: 150,
    progress: 68
  });

  const formatNumbers = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const numbers = e.target.value
      .split(/[\n,;]+/)
      .map(num => num.replace(/[^\d+]/g, '').trim())
      .filter(num => num.length > 5)
      .join('\n');
    
    setCampaign({ ...campaign, numbers });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Campaigns</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Create New Campaign</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Campaign Name</label>
            <input
              type="text"
              value={campaign.name}
              onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter campaign name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Message Template
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-300">
                Use {'{Spintax}'} for variations
              </span>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900/30 dark:text-blue-300">
                Use {'[Name]'} for personalization
              </span>
            </label>
            <textarea
              value={campaign.message}
              onChange={(e) => setCampaign({ ...campaign, message: e.target.value })}
              rows={4}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Type your message here..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone Numbers</label>
            <textarea
              value={campaign.numbers}
              onChange={(e) => setCampaign({ ...campaign, numbers: e.target.value })}
              onBlur={formatNumbers}
              rows={6}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Paste phone numbers (comma, semicolon or newline separated)"
            />
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Numbers will be automatically formatted on blur
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 transition-all font-medium rounded-xl">
              <HiPlay className="mr-2" /> Start Campaign
            </button>
            <button className="flex items-center px-4 py-3 bg-amber-500 hover:bg-amber-600 transition-all font-medium rounded-xl">
              <HiPause className="mr-2" /> Pause
            </button>
            <button className="flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-600 transition-all font-medium rounded-xl">
              <HiRefresh className="mr-2" /> Resume
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Campaign Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Job Queue</div>
              <div className="text-2xl font-bold dark:text-white">{stats.total}</div>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sent Successfully</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.sent}</div>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Failed Messages</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.failed}</div>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Progress</div>
              <div className="text-2xl font-bold dark:text-white">{stats.progress}%</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium dark:text-gray-300">Progress</span>
              <span className="text-sm dark:text-gray-300">{stats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${stats.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}