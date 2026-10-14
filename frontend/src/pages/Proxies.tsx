import { useState } from 'react';
import { HiTrash, HiCheckCircle, HiXCircle } from 'react-icons/hi';

export default function Proxies() {
  const [proxyForm, setProxyForm] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    type: 'residential',
    rotationLink: ''
  });

  const [proxies, setProxies] = useState([
    { id: 1, host: '192.168.1.101', port: '8080', username: 'user1', password: 'pass1', type: 'residential', rotationLink: '', status: true },
    { id: 2, host: '192.168.1.102', port: '8080', username: 'user2', password: 'pass2', type: 'mobile', rotationLink: 'http://rotation.link/1', status: true },
    { id: 3, host: '192.168.1.103', port: '8080', username: 'user3', password: 'pass3', type: 'residential', rotationLink: '', status: false },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProxyForm({ ...proxyForm, [name]: value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProxyForm({ ...proxyForm, type: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProxy = {
      id: proxies.length + 1,
      ...proxyForm,
      status: true
    };
    setProxies([...proxies, newProxy]);
    setProxyForm({
      host: '',
      port: '',
      username: '',
      password: '',
      type: 'residential',
      rotationLink: ''
    });
  };

  const toggleProxyStatus = (id: number) => {
    setProxies(proxies.map(proxy => 
      proxy.id === id ? { ...proxy, status: !proxy.status } : proxy
    ));
  };

  const deleteProxy = (id: number) => {
    setProxies(proxies.filter(proxy => proxy.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Proxy Manager</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Add New Proxy</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Host</label>
                <input
                  type="text"
                  name="host"
                  value={proxyForm.host}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                  placeholder="Proxy host"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Port</label>
                <input
                  type="text"
                  name="port"
                  value={proxyForm.port}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                  placeholder="Proxy port"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
                <input
                  type="text"
                  name="username"
                  value={proxyForm.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                  placeholder="Username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={proxyForm.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Proxy Type</label>
              <select
                value={proxyForm.type}
                onChange={handleTypeChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              >
                <option value="residential">Residential</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Rotation Link URL</label>
              <input
                type="url"
                name="rotationLink"
                value={proxyForm.rotationLink}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                placeholder="https://rotation.link/..."
              />
            </div>
            
            <button 
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Proxy
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Active Proxies</h2>
          
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                <thead className="bg-gray-50 dark:bg-zinc-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Host</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700">
                  {proxies.map(proxy => (
                    <tr key={proxy.id}>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                        <div>{proxy.host}:{proxy.port}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {proxy.username ? `${proxy.username}:${proxy.password}` : 'No auth'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                        <span className={`px-2 py-1 text-xs rounded ${
                          proxy.type === 'mobile' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {proxy.type}
                        </span>
                        {proxy.rotationLink && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <a href={proxy.rotationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              Rotation Link
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleProxyStatus(proxy.id)}
                          className={`flex items-center ${
                            proxy.status 
                              ? 'text-green-600 hover:text-green-800 dark:text-green-400' 
                              : 'text-red-600 hover:text-red-800 dark:text-red-400'
                          }`}
                        >
                          {proxy.status ? <HiCheckCircle className="mr-1" /> : <HiXCircle className="mr-1" />}
                          {proxy.status ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => deleteProxy(proxy.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 flex items-center"
                        >
                          <HiTrash className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}