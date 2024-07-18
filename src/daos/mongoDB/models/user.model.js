import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  cart_id: { type: Schema.Types.ObjectId, ref: "carts" },
});

export const UserModel = model("users", userSchema);
