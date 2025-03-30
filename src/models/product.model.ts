// backend/src/models/product.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface AttributeValue {
  code: string;
  value: any;
}

export interface ProductDocument extends Document {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
  imageUrl?: string;
  description: string;
  price: number;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category_id: { type: Number, required: true },
  attributes: [
    {
      code: { type: String, required: true },
      value: { type: Schema.Types.Mixed },
    },
  ],
  price: { type: String, required: true },
  stock: { type: String, required: true },
});

export default mongoose.model<ProductDocument>("Product", ProductSchema);
