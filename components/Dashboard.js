import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('/api/transactions/summary');
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching summary data', error);
      }
    };
    fetchSummaryData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042'];

  const totalExpenses = summaryData.reduce((total, item) => total + item.value, 0);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Total Expenses: ${totalExpenses}</h3>
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
            >
              {summaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div>
        {summaryData.map((item) => (
          <div key={item.name}>
            <h4>{item.name}</h4>
            <p>${item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
