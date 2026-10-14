import { useState } from 'react';
import { HiPlus, HiQrcode } from 'react-icons/hi';
import { Dialog } from '@headlessui/react';

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(false);
  
  // Mock data for demonstration
  const accounts = [
    { id: 1, phone: '+905551234567', proxy: '192.168.1.101', messages: 1250, status: 'CONNECTED' },
    { id: 2, phone: '+905556789012', proxy: '192.168.1.102', messages: 875, status: 'DISCONNECTED' },
    { id: 3, phone: '+905554567890', proxy: '192.168.1.103', messages: 2450, status: 'CONNECTED' },
    { id: 4, phone: '+905553210987', proxy: '192.168.1.104', messages: 0, status: 'BANNED' },
  ];

  const openQrModal = () => {
    setIsModalOpen(true);
    setIsQrLoading(true);
    
    // Simulate QR code loading
    setTimeout(() => {
      setIsQrLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'DISCONNECTED': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'BANNED': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">WhatsApp Accounts</h1>
        <button 
          onClick={openQrModal}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <HiPlus className="mr-2" /> Add New Channel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg dark:text-white">{account.phone}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Proxy: {account.proxy}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getStatusColor(account.status)}`}>
                {account.status}
              </span>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</div>
              <div className="text-xl font-bold dark:text-white">{account.messages}</div>
            </div>
          </div>
        ))}
      </div>

      <Dialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-zinc-800 shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
            >
              Connect New WhatsApp Account
            </Dialog.Title>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Scan this QR code with your WhatsApp mobile app to link this device
              </div>
              
              <div className="flex justify-center p-8 bg-gray-100 dark:bg-zinc-700 rounded-lg">
                {isQrLoading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Generating QR code...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <HiQrcode className="w-32 h-32 text-green-500" />
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">QR code placeholder</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}