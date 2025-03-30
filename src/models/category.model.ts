import mongoose, { Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
  id: number;
  parent_id?: number;
  name: string;
  description?: string;
}

const CategorySchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  parent_id: { type: Number, default: null },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
