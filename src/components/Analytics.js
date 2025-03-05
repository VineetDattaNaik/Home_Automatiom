import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './Analytics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  // Monthly consumption data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Energy Usage (kWh)',
      data: [1200, 1150, 1300, 1250, 1400, 1500, 1600, 1550, 1400, 1300, 1250, 1200],
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      borderColor: 'rgba(67, 97, 238, 1)',
      tension: 0.4,
      fill: true
    }]
  };

  // Peak usage hours data
  const peakData = {
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [{
      label: 'Average Energy Usage (kWh)',
      data: [50, 30, 40, 120, 150, 180, 190, 100],
      backgroundColor: 'rgba(72, 149, 239, 0.8)',
      borderColor: 'rgba(72, 149, 239, 1)',
      borderWidth: 1
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, weight: '500' },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2b2d42',
        bodyColor: '#2b2d42',
        bodyFont: { size: 14 },
        padding: 12,
        borderColor: 'rgba(67, 97, 238, 0.1)',
        borderWidth: 1,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: (value) => `${value} kWh`,
          font: { size: 12 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Energy Analytics</h1>
      </div>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>Monthly Consumption</h2>
          <div className="chart-container">
            <Line data={monthlyData} options={commonOptions} />
          </div>
        </div>
        <div className="analytics-card">
          <h2>Peak Usage Hours</h2>
          <div className="chart-container">
            <Bar data={peakData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
