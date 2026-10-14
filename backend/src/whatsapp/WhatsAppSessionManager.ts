import { Browser, Page, launch } from 'puppeteer';
import { SessionConfig } from './types';
import { ProxyRotator } from './ProxyRotator';
import { config } from 'dotenv';

config();

export class WhatsAppSessionManager {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private sessionId: string;
  private proxyRotator: ProxyRotator;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.proxyRotator = new ProxyRotator();
  }

  async initialize() {
    const proxy = await this.getProxyForSession();
    const sessionDir = `${process.env.WHATSAPP_SESSION_DIR}/session_${this.sessionId}`;

    this.browser = await launch({
      headless: process.env.WHATSAPP_HEADLESS === 'true',
      args: [
        `--proxy-server=${proxy}`,
        `--user-data-dir=${sessionDir}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      executablePath: process.env.CHROMIUM_PATH || undefined
    });

    this.page = await this.browser.newPage();
    await this.page.authenticate({
      username: proxy.split('@')[0].split(':')[0],
      password: proxy.split('@')[0].split(':')[1]
    });

    await this.page.goto('https://web.whatsapp.com');
    return this.page;
  }

  private async getProxyForSession(): Promise<string> {
    if (process.env.PROXY_ENABLED !== 'true') return '';
    
    const proxies = process.env.PROXY_LIST?.split(',') || [];
    const sessionIndex = parseInt(this.sessionId) % proxies.length;
    let proxy = proxies[sessionIndex];
    
    if (process.env.PROXY_ROTATION_ENABLED === 'true') {
      proxy = await this.proxyRotator.rotateProxy(proxy);
    }
    
    return proxy;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async sendMessage(phone: string, message: string) {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    // Navigate to chat with specific phone number
    await this.page.goto(`https://web.whatsapp.com/send?phone=${phone}`);

    // Wait for the message input to be ready
    await this.page.waitForSelector('div[contenteditable="true"][data-tab="10"]', {
      timeout: 60000
    });

    // Type message with random delays to simulate human typing
    const messageParts = message.split('');
    for (const char of messageParts) {
      await this.page.type('div[contenteditable="true"][data-tab="10"]', char, {
        delay: Math.random() * 100 + 50 // Random delay between 50-150ms per char
      });
    }

    // Press Enter to send message
    await this.page.keyboard.press('Enter');
  }
}
