import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    _id: string;
    title: string;
    price: number;
    qty: number;
  }[];
  total: number;
  status: string;
  payment?: {
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    method?: string;
    captured?: boolean;
  };
}

const OrderSchema = new Schema<IOrder>(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },

    // FIXED: Array of objects MUST use [{}] pattern
    items: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],

    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },

    payment: {
      razorpay_payment_id: { type: String },
      razorpay_order_id: { type: String },
      razorpay_signature: { type: String },
      method: { type: String },
      captured: { type: Boolean },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
