import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Campaign API methods
export const CampaignAPI = {
  startCampaign: (campaignId: string, numbers: string[]) => 
    api.post('/campaigns/start', { campaignId, numbers }),
  
  getCampaignStatus: (id: string) => 
    api.get(`/campaigns/${id}/status`),
  
  pauseCampaign: (id: string) => 
    api.post(`/campaigns/${id}/pause`),
  
  resumeCampaign: (id: string) => 
    api.post(`/campaigns/${id}/resume`),
};

// WhatsApp Account API methods
export const WhatsAppAPI = {
  getAccounts: () => 
    api.get('/whatsapp/accounts'),
  
  connectAccount: (phone: string) => 
    api.post('/whatsapp/connect', { phone }),
  
  disconnectAccount: (id: string) => 
    api.post('/whatsapp/disconnect', { id }),
};

// Proxy API methods
export const ProxyAPI = {
  getProxies: () => 
    api.get('/proxies'),
  
  addProxy: (proxyData: any) => 
    api.post('/proxies', proxyData),
  
  removeProxy: (id: string) => 
    api.delete(`/proxies/${id}`),
};

// Dashboard API methods
export const DashboardAPI = {
  getStats: () => 
    api.get('/dashboard/stats'),
  
  getRecentActivity: () => 
    api.get('/dashboard/activity'),
};

export default api;