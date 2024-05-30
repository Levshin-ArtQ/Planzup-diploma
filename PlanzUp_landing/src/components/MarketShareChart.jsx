// import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['PlanzUp', 'Yclients', 'Dikidi', 'Profi.ru', 'Тинькофф Город'],
  datasets: [
    {
      data: [20, 30, 25, 15, 10],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }
  ]
};

const MarketShareChart = () => (
  <div>
    <h2 className="text-center">Market Share 📊</h2>
    <Pie data={data} />
  </div>
);

export default MarketShareChart;