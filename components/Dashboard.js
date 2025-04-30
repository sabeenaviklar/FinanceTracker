import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  

  useEffect(() => {
    if (month && year) {
      const fetchData = async () => {
        // Fetch Budget Data
        const budgetRes = await fetch(`/api/budgets?month=${month}&year=${year}`);
        const budgets = await budgetRes.json();

        // Fetch Transaction Data
        const transactionRes = await fetch(`/api/transactions?month=${month}&year=${year}`);
        const transactions = await transactionRes.json();

        setBudgetData(budgets);
        setTransactionData(transactions);

        // Compare Budget vs Actual
        const comparison = budgets.map(budget => {
          const actual = transactions
            .filter(transaction => transaction.category === budget.category)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          return { ...budget, actual, difference: budget.amount - actual };
        });

        setComparisonData(comparison);
      };

      fetchData();
    }
  }, [month, year]);

  return (
    <div>
      <h2>Budget vs Actual Comparison</h2>
      <div>
        <label>Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div>
        <h3>Comparison</h3>
        <ul>
          {comparisonData.map((data, index) => (
            <li key={index}>
              <p>Category: {data.category}</p>
              <p>Budget: {data.amount}</p>
              <p>Actual: {data.actual}</p>
              <p>Difference: {data.difference}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

const Insights = ({ comparisonData }) => {
    const totalSpent = comparisonData.reduce((sum, data) => sum + data.actual, 0);
    const totalBudget = comparisonData.reduce((sum, data) => sum + data.amount, 0);
  
    return (
      <div>
        <h3>Spending Insights</h3>
        <p>Total Budget: {totalBudget}</p>
        <p>Total Spent: {totalSpent}</p>
        <p>Remaining Budget: {totalBudget - totalSpent}</p>
      </div>
    );
  };
