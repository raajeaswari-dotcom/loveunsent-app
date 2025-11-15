import mongoose, { Schema, Document } from "mongoose";

export interface IWriter extends Document {
  name: string;
}

const WriterSchema = new Schema<IWriter>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Writer ||
  mongoose.model<IWriter>("Writer", WriterSchema);
