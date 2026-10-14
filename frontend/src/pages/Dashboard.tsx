import React from 'react';
import LiveLogger from '../components/LiveLogger';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-200 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-medium text-slate-400">Active WhatsApp Accounts</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-500">12</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-medium text-slate-400">Total Campaign Queue (45k Limit)</h3>
          <p className="text-4xl font-bold mt-2 text-amber-500">45,000</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-medium text-slate-400">Success Delivery Rate (%)</h3>
          <p className="text-4xl font-bold mt-2 text-green-500">98%</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-4">Live Logger</h2>
        <LiveLogger />
      </div>
    </div>
  );
};

export default Dashboard;