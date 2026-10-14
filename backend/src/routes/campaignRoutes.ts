import express, { Request, Response } from 'express';
import QueueManager from '../queue/QueueManager';
import Campaign from '../models/Campaign';
import { sanitizePhoneNumbers } from '../utils/phoneUtils';

const router = express.Router();

// Start a new campaign
router.post('/api/campaigns/start', async (req: Request, res: Response) => {
  try {
    const { campaignId, numbers } = req.body;
    
    // Validate input
    if (!campaignId || !numbers) {
      return res.status(400).json({ error: 'Missing campaignId or numbers' });
    }
    
    // Sanitize phone numbers
    const sanitizedNumbers = sanitizePhoneNumbers(numbers);
    
    // Add campaign to queue
    await QueueManager.addCampaignToQueue(campaignId, sanitizedNumbers);
    
    // Update campaign status to RUNNING
    await Campaign.findByIdAndUpdate(campaignId, { status: 'RUNNING' });
    
    res.status(200).json({ message: 'Campaign started successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get campaign status
router.get('/api/campaigns/:id/status', async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.status(200).json({
      name: campaign.name,
      status: campaign.status,
      totalNumbers: campaign.totalNumbers,
      processedNumbers: campaign.processedNumbers,
      successCount: campaign.successCount,
      failCount: campaign.failCount,
      progress: Math.round((campaign.processedNumbers / campaign.totalNumbers) * 100)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Pause campaign
router.post('/api/campaigns/:id/pause', async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    // Update campaign status to PAUSED
    await Campaign.findByIdAndUpdate(req.params.id, { status: 'PAUSED' });
    
    // TODO: Implement actual pause logic for BullMQ queue
    
    res.status(200).json({ message: 'Campaign paused successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Resume campaign
router.post('/api/campaigns/:id/resume', async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    // Update campaign status to RUNNING
    await Campaign.findByIdAndUpdate(req.params.id, { status: 'RUNNING' });
    
    // TODO: Implement actual resume logic for BullMQ queue
    
    res.status(200).json({ message: 'Campaign resumed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;