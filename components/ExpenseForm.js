// components/ExpenseForm.js

import { useState } from 'react';

export default function ExpenseForm({ addTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      setError('All fields are required');
      return;
    }

    if (isNaN(amount)) {
      setError('Amount must be a number');
      return;
    }

    setError('');
    addTransaction({ description, amount: parseFloat(amount), category, date: new Date() });
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Add Expense</button>
    </form>
  );
}
