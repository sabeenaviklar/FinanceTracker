

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


// export default async function handler(req, res) {
//   await connectDB();  // Ensure DB connection

//   // Handle GET request
//   if (req.method === 'GET') {
//     try {
//       const transactions = await Transaction.find().sort({ date: -1 }); // Optional sorting by date
//       res.status(200).json(transactions);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching transactions' });
//     }
//   }

//   // Handle POST request
//   else if (req.method === 'POST') {
//     try {
//       const { description, amount, category, date } = req.body;

//       // Create a new transaction
//       const newTransaction = new Transaction({ description, amount, category, date });
//       await newTransaction.save();

//       res.status(201).json(newTransaction);  // Send back the created transaction
//     } catch (error) {
//       res.status(500).json({ error: 'Error saving transaction' });
//     }
//   }

//   // Handle DELETE request
//   else if (req.method === 'DELETE') {
//     try {
//       const { id } = req.body;  // Assuming `id` is sent in the body to delete a specific transaction

//       await Transaction.findByIdAndDelete(id);  // Delete the transaction by ID
//       res.status(200).json({ message: 'Transaction deleted' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting transaction' });
//     }
//   }

//   // Method not allowed for other HTTP methods
//   else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

import { connectDB } from '@/lib/db';  // DB connection utility
import Transaction from '@/models/transaction';
import Budget from '@/models/Budget';  // Import the Budget model

export default async function handler(req, res) {
  await connectDB();  // Ensure DB connection

  //  GET request for transactions
  if (req.method === 'GET') {
    try {
      const transactions = await Transaction.find().sort({ date: -1 }); // Sort transactions by date descending
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  }

  // POST request for transactions
  else if (req.method === 'POST') {
    try {
      const { description, amount, category, date } = req.body;

     
      const newTransaction = new Transaction({ description, amount, category, date });
      await newTransaction.save();

      res.status(201).json(newTransaction);  // Send back the created transaction
    } catch (error) {
      res.status(500).json({ error: 'Error saving transaction' });
    }
  }

  // DELETE request for transactions
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;  // Assuming `id` is sent in the body to delete a specific transaction

      await Transaction.findByIdAndDelete(id);  // Delete the transaction by ID
      res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting transaction' });
    }
  }

  //  GET request for Budgeting 
  else if (req.method === 'GET' && req.query.type === 'budget') {
    try {
      const { month, year } = req.query;
      const budgets = await Budget.find({ month, year });
      res.status(200).json(budgets);  // Return budgets for the month/year
    } catch (error) {
      res.status(500).json({ error: 'Error fetching budgets' });
    }
  }

  //  POST request for setting budgets
  else if (req.method === 'POST' && req.body.type === 'budget') {
    try {
      const { category, amount, month, year } = req.body;

      // Check if a budget already exists for this category, month, and year
      const existingBudget = await Budget.findOne({ category, month, year });

      if (existingBudget) {
        // If budget exists, updating it
        existingBudget.amount = amount;
        await existingBudget.save();
        res.status(200).json(existingBudget);
      } else {
        // If no existing budget, creating a new one
        const newBudget = new Budget({ category, amount, month, year });
        await newBudget.save();
        res.status(201).json(newBudget);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error setting budget' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
