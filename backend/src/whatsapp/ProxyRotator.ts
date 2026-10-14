import axios from 'axios';

export class ProxyRotator {
  async rotateProxy(proxy: string): Promise<string> {
    if (!proxy) return proxy;
    
    // Extract proxy credentials and host
    const [credentials, host] = proxy.split('@');
    const [username, password] = credentials.split(':');
    
    try {
      // Rotate proxy using the rotation URL
      const rotationUrl = process.env.PROXY_ROTATION_URL;
      if (!rotationUrl) return proxy;
      
      await axios.get(rotationUrl, {
        proxy: {
          host,
          port: parseInt(host.split(':')[1] || '80'),
          auth: { username, password }
        }
      });
      
      // Wait for network restoration
      await new Promise(resolve => setTimeout(resolve, 5000));
      return proxy;
    } catch (error) {
      console.error(`Proxy rotation failed: ${error.message}`);
      return proxy;
    }
  }
}