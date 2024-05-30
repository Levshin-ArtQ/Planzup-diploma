// import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend);

const data = {
  labels: ['Professionalism', 'Quality', 'Speed of Response', 'Booking Experience'],
  datasets: [
    {
      label: 'Client Preferences',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 75, 70, 80]
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
      text: 'Client Preferences'
    }
  }
};

const ClientPreferencesChart = () => (
  <div>
    <h2 className="text-center">Client Preferences 📈</h2>
    <Radar data={data} options={options} />
  </div>
);

export default ClientPreferencesChart;
