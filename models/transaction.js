import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: Number,
    date: Date,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
