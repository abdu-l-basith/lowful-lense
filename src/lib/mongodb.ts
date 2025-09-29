// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) throw new Error("MONGODB_URI missing");

declare global {
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

if (!global._mongoosePromise) {
  global._mongoosePromise = mongoose.connect(MONGODB_URI, {});
}
export default global._mongoosePromise;
