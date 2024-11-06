import { Schema, model } from "mongoose";

const petMockSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "UserMock" },
  },
  { versionKey: false }
);

export const PetMockModel = model("PetMock", petMockSchema);
