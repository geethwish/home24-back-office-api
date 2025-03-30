import mongoose, { Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
  id: string;
  parent_id?: string | null;
  name: string;
  description?: string;
}

const CategorySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    parent_id: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
