import connectDB from '@/lib/db';
import Transaction from '@/models/Transaction';

// export default async function handler(req, res) {
//   await connectDB();

//   if (req.method === 'GET') {
//     const transactions = await Transaction.find().sort({ date: -1 });
//     return res.status(200).json(transactions);
//   }

//   if (req.method === 'POST') {
//     const { amount, description, date } = req.body;
//     const newTransaction = new Transaction({ amount, description, date });
//     await newTransaction.save();
//     return res.status(201).json(newTransaction);
//   }

//   if (req.method === 'DELETE') {
//     const { id } = req.body;
//     await Transaction.findByIdAndDelete(id);
//     return res.status(200).json({ message: 'Deleted' });
//   }

//   res.status(405).json({ message: 'Method not allowed' });
// }

export default async function handler(req, res) {
    await dbConnect();
  
    if (req.method === 'GET') {
      try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
      }
    } else if (req.method === 'POST') {
      try {
        const { description, amount, category, date } = req.body;
  
        const newTransaction = new Transaction({ description, amount, category, date });
        await newTransaction.save();
        res.status(201).json(newTransaction);
      } catch (error) {
        res.status(500).json({ error: 'Error saving transaction' });
      }
    }
  }