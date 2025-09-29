// models/Visitor.ts
import mongoose, { Schema } from "mongoose";

const VisitorSchema = new Schema({
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

export default (mongoose.models.Visitor as mongoose.Model<any>) ||
  mongoose.model("Visitor", VisitorSchema);
