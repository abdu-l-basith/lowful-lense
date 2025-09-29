import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define TypeScript interface for User
export interface IUser extends Document {
  username: string;
  password: string; // ⚠️ plain text is unsafe, hash it in production
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create Schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Export Model with strong typing
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
