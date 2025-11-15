import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parent?: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    parent: { type: String, default: "" }, // supports subcategories
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
