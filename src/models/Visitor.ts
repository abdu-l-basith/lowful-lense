import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define a TypeScript interface for the Visitor
export interface IVisitor extends Document {
  receivedAt: Date;
  clientIp?: string;
  userAgent?: string;
  platform?: string;
  languages?: string;
  timezone?: string;
  screen?: string;
  colorDepth?: number;
  pixelRatio?: number;
  fingerprint?: string;
  localIPs?: string[];
  raw?: any;
  latitude?: number;
  longitude?: number;
  latitude_rounded?: number;
  longitude_rounded?: number;
  accuracy?: number;
  locationConsent?: boolean;
}

// 2. Create the schema
const VisitorSchema = new Schema<IVisitor>({
  receivedAt: { type: Date, default: () => new Date() },
  clientIp: String,
  userAgent: String,
  platform: String,
  languages: String,
  timezone: String,
  screen: String,
  colorDepth: Number,
  pixelRatio: Number,
  fingerprint: { type: String, index: true },
  localIPs: [String],
  raw: Schema.Types.Mixed,
  latitude: Number,
  longitude: Number,
  latitude_rounded: Number,
  longitude_rounded: Number,
  accuracy: Number,
  locationConsent: Boolean,
});

// 3. Type-safe model export
const Visitor: Model<IVisitor> =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;