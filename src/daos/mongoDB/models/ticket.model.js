import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    code: { type: String, required: true },
    purchase_datetime: { type: String, required: true,},
    amount: { type: Number, required: true },
    purchaser: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { versionKey: false }
);

export const TicketModel = model("tickets", ticketSchema);
