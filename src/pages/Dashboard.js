import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles.css'; // Ensure the path is correct

const Dashboard = () => {
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = () => {
    // Replace this with your actual logic to generate a report
    const exampleReport = [
      { month: 'May', income: 3000, expenses: 800 },
      { month: 'June', income: 500, expenses: 150 },
      // Add more data as needed
    ];
    setReportData(exampleReport);
  };

  const data = {
    labels: reportData ? reportData.map(item => item.month) : [],
    datasets: [
      {
        label: 'Income',
        data: reportData ? reportData.map(item => item.income) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenses',
        data: reportData ? reportData.map(item => item.expenses) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [{
        ticks: { beginAtZero: true }
      }],
      yAxes: [{
        ticks: { beginAtZero: true }
      }],
    },
  };

  return (
    <div className="section">
      <h2>Dashboard</h2>
      <p>Overview of expenses and income for each month.</p>
      <button className="btn-green" onClick={handleGenerateReport}>Generate Report</button>
      {reportData && (
        <div className="graph-container">
          <h3>Generated Report</h3>
          <div className="graph">
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
