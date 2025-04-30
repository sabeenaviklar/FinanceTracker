import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'],
    required: true,
  },
  amount: { type: Number, required: true },
  month: { type: String, required: true },  // e.g., '2025-05'
  year: { type: Number, required: true },   // e.g., 2025
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;
