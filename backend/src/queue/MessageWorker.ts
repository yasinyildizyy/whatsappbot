import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import WhatsAppAccount, { AccountStatus } from '../models/WhatsAppAccount';
import ProxyConfig from '../models/ProxyConfig';
import Campaign from '../models/Campaign';
import MessageLog, { MessageStatus } from '../models/MessageLog';
import { WhatsAppSessionManager } from '../whatsapp/WhatsAppSessionManager';
import { randomInt } from 'crypto';
import axios from 'axios';

// Redis connection
const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

// Configuration constants
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '50');
const TYPING_MIN_DELAY = 2000;
const TYPING_MAX_DELAY = 6000;
const ANTIBAN_MIN_DELAY = 30000;
const ANTIBAN_MAX_DELAY = 90000;

// Worker state
let currentAccountIndex = 0;
let messageCountSinceRotation = 0;

const worker = new Worker('whatsapp-sending-queue', async (job: Job) => {
  const { campaignId, destinationPhone } = job.data;
  let account: any = null;
  
  try {
    // Step A: Select next available account (Round-Robin)
    const accounts = await WhatsAppAccount.find({ status: AccountStatus.CONNECTED });
    if (accounts.length === 0) {
      throw new Error('No connected WhatsApp accounts available');
    }
    
    account = accounts[currentAccountIndex % accounts.length];
    currentAccountIndex = (currentAccountIndex + 1) % accounts.length;
    
    // Step B: Proxy rotation check
    const proxy = await ProxyConfig.findById(account.proxyUsed);
    if (proxy?.type === 'MOBILE' && proxy.rotationUrl) {
      messageCountSinceRotation++;
      
      if (messageCountSinceRotation >= BATCH_SIZE) {
        // Rotate proxy
        await axios.get(proxy.rotationUrl);
        messageCountSinceRotation = 0;
        
        // Sleep for connection recovery
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    // Step C: Human behavior simulation (typing)
    const typingDelay = randomInt(TYPING_MIN_DELAY, TYPING_MAX_DELAY);
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    
    // Step D: Parse spintax and variables
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }
    
    // Spintax parsing (simplified)
    const parseSpintax = (text: string) => {
      return text.replace(/\{([^}]+)\}/g, (_, options) => {
        const choices = options.split('|');
        return choices[Math.floor(Math.random() * choices.length)];
      });
    };
    
    const message = parseSpintax(campaign.messageTemplate)
      .replace(/\[Name\]/g, 'User'); // Placeholder for actual name
    
    // Step E: Dispatch message
    const sessionManager = new WhatsAppSessionManager(account.sessionID);
    await sessionManager.initialize();
    
    try {
      await sessionManager.sendMessage(destinationPhone, message);
    } finally {
      await sessionManager.close();
    }
    
    // Update account usage
    await WhatsAppAccount.findByIdAndUpdate(account._id.toString(), {
      $inc: { messagingCount: 1 },
      lastUsedAt: new Date()
    });
    
    // Step G: Log success
    await MessageLog.create({
      campaignId,
      accountId: account._id,
      destinationPhone,
      status: MessageStatus.SENT,
      proxyUsed: account.proxyUsed
    });
    
    // Update campaign stats
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { 
        processedNumbers: 1,
        successCount: 1
      }
    });
    
    // Step F: Anti-ban delay
    const antibanDelay = randomInt(ANTIBAN_MIN_DELAY, ANTIBAN_MAX_DELAY);
    await new Promise(resolve => setTimeout(resolve, antibanDelay));
    
    return { status: 'success' };
  } catch (error: any) {
    // Log failure
    await MessageLog.create({
      campaignId,
      accountId: account?._id,
      destinationPhone,
      status: MessageStatus.FAILED,
      errorMessage: error.message,
      proxyUsed: account?.proxyUsed
    });
    
    // Update campaign stats
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { 
        processedNumbers: 1,
        failCount: 1
      }
    });
    
    throw error;
  }
}, {
  connection: redisConnection,
  concurrency: 1 // Process one message at a time for better anti-ban
});

console.log('WhatsApp message worker started');

// Handle worker events
worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

export default worker;