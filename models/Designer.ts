import mongoose, { Schema, Document } from "mongoose";

export interface IDesigner extends Document {
  name: string;
}

const DesignerSchema = new Schema<IDesigner>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Designer ||
  mongoose.model<IDesigner>("Designer", DesignerSchema);
