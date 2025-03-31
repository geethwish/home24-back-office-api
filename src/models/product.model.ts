import mongoose, { Schema, Document } from "mongoose";

interface AttributeValue {
  code: string;
  value: any;
  type: "number" | "text" | "url" | "tags" | "boolean";
}

export interface ProductDocument extends Document {
  id: string;
  name: string;
  category_id: string;
  attributes: AttributeValue[];
  imageUrl?: string;
  description: string;
  price: number;
  stock: number;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category_id: { type: String, required: true },
    attributes: [
      {
        code: { type: String, required: true },
        value: { type: Schema.Types.Mixed },
        type: {
          type: String,
          enum: ["number", "text", "url", "tags", "boolean"],
          required: true,
        },
      },
    ],
    price: { type: Number, required: true },
    stock: { type: Number, required: false },
    imageUrl: { type: String, required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<ProductDocument>("Product", ProductSchema);
