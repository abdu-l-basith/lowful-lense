import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define TypeScript interface
export interface IAddress extends Document {
  fullName: string;
  mobile: string;
  email: string;
  house?: string;
  street?: string;
  landmark?: string;
  district?: string;
  pincode?: string;
  state?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema definition
const AddressSchema = new Schema<IAddress>(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    house: String,
    street: String,
    landmark: String,
    district: String,
    pincode: String,
    state: String,
  },
  { timestamps: true }
);

// 3. Strongly typed model export
export const Address: Model<IAddress> =
  mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
