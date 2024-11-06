import { Schema, model } from "mongoose";

const userMockSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    pets: [{ type: Schema.Types.ObjectId, ref: "PetMock" }],
  },
  { versionKey: false }
);

export const UserMockModel = model("UserMock", userMockSchema);
