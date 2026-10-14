import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mailbox, 
  Contact, 
  Server 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/campaigns', label: 'Campaigns', icon: <Mailbox size={20} /> },
    { path: '/accounts', label: 'Accounts', icon: <Contact size={20} /> },
    { path: '/proxies', label: 'Proxies', icon: <Server size={20} /> },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 w-64 min-h-screen border-r border-slate-800 p-4">
      <div className="text-xl font-bold mb-6 text-emerald-500">WhatsApp Bot</div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center py-3 px-4 rounded-xl transition-all ${
              location.pathname === item.path
                ? 'bg-emerald-500 text-white'
                : 'hover:bg-slate-900 hover:text-emerald-400'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;