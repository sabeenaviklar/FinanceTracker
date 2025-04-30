import mongoose, { Schema } from "mongoose";

// const transactionSchema = new Schema(
//   {
//     amount: Number,
//     date: Date,
//     description: String,
//   },
//   { timestamps: true }
// );

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'],
    required: true,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
