import mongoose, { Schema, Document } from "mongoose";

export interface IPaperType extends Document {
  name: string;
}

const PaperTypeSchema = new Schema<IPaperType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.PaperType ||
  mongoose.model<IPaperType>("PaperType", PaperTypeSchema);
