import mongoose, { Schema, Document } from 'mongoose';

export enum CampaignStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export interface ICampaign extends Document {
  name: string;
  messageTemplate: string;
  totalNumbers: number;
  processedNumbers: number;
  successCount: number;
  failCount: number;
  status: CampaignStatus;
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  messageTemplate: { type: String, required: true },
  totalNumbers: { type: Number, required: true },
  processedNumbers: { type: Number, default: 0 },
  successCount: { type: Number, default: 0 },
  failCount: { type: Number, default: 0 },
  status: { 
    type: String, 
    required: true, 
    enum: Object.values(CampaignStatus),
    default: CampaignStatus.PENDING
  }
}, { timestamps: true });

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);