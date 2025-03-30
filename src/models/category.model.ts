import mongoose, { Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
  parent_id?: number;
  name: string;
  description?: string;
}

const CategorySchema: Schema = new Schema({
  parent_id: { type: Number, default: null },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
