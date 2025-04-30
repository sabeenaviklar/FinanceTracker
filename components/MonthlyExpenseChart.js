// components/MonthlyExpenseChart.js

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthlyExpenseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get('/api/transactions'); // Assuming an API endpoint to fetch all transactions
        const transactions = response.data;

        const monthlyExpenses = {};

        transactions.forEach((transaction) => {
          const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
          monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transaction.amount;
        });

        const chartData = Object.keys(monthlyExpenses).map((month) => ({
          name: month,
          expense: monthlyExpenses[month],
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
