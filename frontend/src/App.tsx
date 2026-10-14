import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Accounts from './pages/Accounts';
import Proxies from './pages/Proxies';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-slate-200">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/proxies" element={<Proxies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
