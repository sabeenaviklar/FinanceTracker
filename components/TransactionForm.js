// 'use client';
// import { useState } from 'react';

// export default function TransactionForm({ onAdd }) {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!amount || !description || !date) return alert('Fill all fields');

//     const res = await fetch('/api/transactions', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount, description, date }),
//     });

//     const data = await res.json();
//     onAdd(data);
//     setAmount('');
//     setDescription('');
//     setDate('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <button type="submit">Add Transaction</button>
//     </form>
//   );
// }

import { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ fetchTransactions }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transactions/add', { amount, description, category });
      fetchTransactions(); // Refresh the data
      setAmount('');
      setDescription('');
      setCategory('Food');
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
