import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './EnergyPrediction.css';

const EnergyPrediction = ({ historicalData }) => {
  const [prediction, setPrediction] = useState(null);

  // Simple AI prediction algorithm based on moving average and trend analysis
  const predictNextWeek = (data) => {
    // Calculate the trend
    const trend = data.slice(-7).reduce((acc, curr, idx, arr) => {
      if (idx === 0) return 0;
      return acc + (curr - arr[idx - 1]);
    }, 0) / 6;

    // Calculate moving average
    const movingAverage = data.slice(-7).reduce((a, b) => a + b, 0) / 7;

    // Generate predictions for next 7 days
    return Array(7).fill().map((_, idx) => {
      return Math.max(0, movingAverage + (trend * (idx + 1)));
    });
  };

  useEffect(() => {
    if (historicalData?.week?.data) {
      const predictedValues = predictNextWeek(historicalData.week.data);
      setPrediction(predictedValues);
    }
  }, [historicalData]);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Predicted Usage (kWh)',
        data: prediction,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2b2d42',
        bodyColor: '#2b2d42',
        borderColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value.toFixed(1)} kWh`
        }
      }
    }
  };

  return (
    <div className="card prediction-card">
      <h2>AI Energy Prediction</h2>
      <div className="prediction-content">
        <div className="prediction-chart">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="prediction-insights">
          <h3>Energy Insights</h3>
          {prediction && (
            <>
              <p>Predicted weekly total: {prediction.reduce((a, b) => a + b, 0).toFixed(1)} kWh</p>
              <p>Average daily usage: {(prediction.reduce((a, b) => a + b, 0) / 7).toFixed(1)} kWh</p>
              <p>Peak day: {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][prediction.indexOf(Math.max(...prediction))]}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyPrediction;