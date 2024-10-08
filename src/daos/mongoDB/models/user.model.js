import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  phone: { type: String, required: true },
  countryCode: { type: String, required: true, minlength: 2, maxlength: 2 },
  cart_id: { type: Schema.Types.ObjectId, ref: "carts"},
},
{ versionKey: false });

export const UserModel = model("users", userSchema);
