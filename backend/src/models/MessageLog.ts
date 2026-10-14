import mongoose, { Schema, Document } from 'mongoose';

export enum MessageStatus {
  SENT = 'SENT',
  FAILED = 'FAILED'
}

export interface IMessageLog extends Document {
  campaignId: mongoose.Schema.Types.ObjectId;
  accountId: mongoose.Schema.Types.ObjectId;
  destinationPhone: string;
  status: MessageStatus;
  errorMessage?: string;
  proxyUsed: mongoose.Schema.Types.ObjectId;
}

const MessageLogSchema: Schema = new Schema({
  campaignId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  accountId: { 
    type: Schema.Types.ObjectId, 
    ref: 'WhatsAppAccount', 
    required: true 
  },
  destinationPhone: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: Object.values(MessageStatus) 
  },
  errorMessage: { type: String },
  proxyUsed: { 
    type: Schema.Types.ObjectId, 
    ref: 'ProxyConfig', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model<IMessageLog>('MessageLog', MessageLogSchema);