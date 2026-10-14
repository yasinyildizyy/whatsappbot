import mongoose, { Schema, Document } from 'mongoose';

export enum AccountStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  BANNED = 'BANNED'
}

export interface IWhatsAppAccount extends Document {
  sessionID: string;
  phone: string;
  status: AccountStatus;
  proxyUsed: mongoose.Schema.Types.ObjectId;
  messagingCount: number;
  lastUsedAt: Date;
}

const WhatsAppAccountSchema: Schema = new Schema({
  sessionID: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    required: true, 
    enum: Object.values(AccountStatus),
    default: AccountStatus.DISCONNECTED
  },
  proxyUsed: { type: Schema.Types.ObjectId, ref: 'ProxyConfig', required: true },
  messagingCount: { type: Number, default: 0 },
  lastUsedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model<IWhatsAppAccount>('WhatsAppAccount', WhatsAppAccountSchema);