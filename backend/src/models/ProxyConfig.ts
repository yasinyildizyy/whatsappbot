import mongoose, { Schema, Document } from 'mongoose';

export enum ProxyType {
  RESIDENTIAL = 'RESIDENTIAL',
  MOBILE = 'MOBILE'
}

export interface IProxyConfig extends Document {
  host: string;
  port: number;
  username: string;
  password: string;
  type: ProxyType;
  rotationUrl?: string;
  isActive: boolean;
}

const ProxyConfigSchema: Schema = new Schema({
  host: { type: String, required: true },
  port: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: Object.values(ProxyType),
    default: ProxyType.RESIDENTIAL
  },
  rotationUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IProxyConfig>('ProxyConfig', ProxyConfigSchema);