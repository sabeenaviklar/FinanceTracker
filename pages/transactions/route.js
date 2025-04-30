import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, description, date } = req.body;
    const newTransaction = new Transaction({ amount, description, date });
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await Transaction.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
