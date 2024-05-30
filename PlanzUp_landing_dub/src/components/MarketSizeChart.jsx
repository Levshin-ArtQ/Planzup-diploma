// import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const data = {
  labels: ['TAM', 'SAM', 'SOM'],
  datasets: [
    {
      label: 'Market Size in $M',
      data: [500, 200, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Market Size'
    }
  }
};

const MarketSizeChart = () => (
  <div>
    <h2 className="text-center">Market Size 🌐</h2>
    <Doughnut data={data} options={options} />
  </div>
);

export default MarketSizeChart;
