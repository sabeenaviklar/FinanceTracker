import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ExpenseChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + txn.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <BarChart width={400} height={300} data={chartData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
}
