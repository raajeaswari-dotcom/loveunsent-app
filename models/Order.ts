import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: any[];
  total: number;
  status: string; // Pending, Confirmed, Delivered
}

const OrderSchema = new Schema<IOrder>(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
