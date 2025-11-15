import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  tags?: string[];
  paperType?: string;
  writer?: string;
  designer?: string;
  category?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    paperType: { type: String },
    writer: { type: String },
    designer: { type: String },
    category: { type: String }, // 🚀 NEW
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
