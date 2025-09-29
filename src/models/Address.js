import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    fullName: String,
    mobile: String,
    email: String,
    house: String,
    street: String,
    landmark: String,
    district: String,
    pincode: String,
    state: String,
  },
  { timestamps: true }
);

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);
