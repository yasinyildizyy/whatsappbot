import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import Campaign from '../models/Campaign';

// Redis connection using environment variables
const redisConnection = new IORedis(
  process.env.REDIS_URL || 
  (process.env.NODE_ENV === 'production' ? 'redis://redis:6379' : 'redis://localhost:6379')
);

class QueueManager {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('whatsapp-sending-queue', {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true
      }
    });
  }

  async addCampaignToQueue(campaignId: string, numbersList: string[]) {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }

    // Split numbers into individual jobs
    const jobs = numbersList.map(phone => ({
      name: 'send-whatsapp-message',
      data: {
        campaignId,
        destinationPhone: phone
      },
      opts: {
        jobId: `${campaignId}-${phone}` // Unique job ID
      }
    }));

    await this.queue.addBulk(jobs);
    console.log(`Added ${jobs.length} jobs to queue for campaign ${campaignId}`);
  }

  async getQueue() {
    return this.queue;
  }
}

export default new QueueManager();