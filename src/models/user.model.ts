// backend/src/models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model<UserDocument>("User", UserSchema);
