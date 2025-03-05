
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';
import BudgetAlert from './BudgetAlert';
import EnergyPrediction from './EnergyPrediction';
import VoiceAssistant from './VoiceAssistant';
// Supabase import removed as we'll use the API instead

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [energyData, setEnergyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetSettings, setBudgetSettings] = useState({
    dailyBudget: 50,
    weeklyBudget: 300,
    monthlyBudget: 1000,
    alertThreshold: 80
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem('energySettings');
    if (storedSettings) {
      setBudgetSettings(JSON.parse(storedSettings));
    }
    
    fetchEnergyData();
  }, [selectedPeriod]);

  const fetchEnergyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/energy/usage/${selectedPeriod}`);
      if (!response.ok) {
        throw new Error('Failed to fetch energy data');
      }
      const data = await response.json();
      setEnergyData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data if API fails
      const mockData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [30, 45, 35, 50, 40, 35, 45],
        total: 280,
        comparison: '↑ 5% vs last week',
        appliances: {
          'Air Conditioner': { usage: 90, percentage: 37 },
          'Refrigerator': { usage: 40, percentage: 16 },
          'Lighting': { usage: 35, percentage: 14 },
          'Water Heater': { usage: 45, percentage: 18 }
        }
      };
      setEnergyData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const getBudgetForPeriod = () => {
    switch (selectedPeriod) {
      case 'today':
        return budgetSettings.dailyBudget;
      case 'week':
        return budgetSettings.weeklyBudget;
      case 'month':
        return budgetSettings.monthlyBudget;
      default:
        return budgetSettings.monthlyBudget;
    }
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const chartData = energyData ? {
    labels: energyData.labels,
    datasets: [{
      label: 'Energy Usage (kWh)',
      data: energyData.data,
      fill: true,
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      borderColor: 'rgba(67, 97, 238, 1)',
      tension: 0.4,
      pointBackgroundColor: 'white',
      pointBorderColor: 'rgba(67, 97, 238, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2b2d42',
        bodyColor: '#2b2d42',
        borderColor: 'rgba(67, 97, 238, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `${context.parsed.y} kWh`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          },
          callback: (value) => `${value} kWh`
        }
      }
    }
  };

  if (isLoading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Energy Dashboard</h1>
        <div className="date-filter">
          <select value={selectedPeriod} onChange={handlePeriodChange}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
      
      {energyData && (
        <BudgetAlert
          currentUsage={energyData.total}
          budget={getBudgetForPeriod()}
          alertThreshold={budgetSettings.alertThreshold}
        />
      )}

      <div className="dashboard-grid">
        {energyData && (
          <>
            <div className="card usage-total">
              <h2>Total Energy Usage</h2>
              <div className="usage-amount">
                {energyData.total}<span className="unit">kWh</span>
              </div>
              <p className="comparison">{energyData.comparison}</p>
            </div>

            <div className="card usage-by-appliance">
              <h2>Usage by Appliance</h2>
              <div className="appliance-grid">
                {Object.entries(energyData.appliances).map(([appliance, data]) => (
                  <div className="appliance-item" key={appliance}>
                    <h3>{appliance}</h3>
                    <p className="usage">{data.usage} kWh</p>
                    <p className="percentage">{data.percentage}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card usage-trend">
              <h2>Usage Trend</h2>
              <div className="trend-chart">
                {chartData && <Line data={chartData} options={chartOptions} />}
              </div>
            </div>

            {/* Add Voice Assistant */}
            <div className="card voice-assistant-card">
              <h2>Voice Assistant</h2>
              <VoiceAssistant 
                onCommand={(command, response) => console.log('Voice command:', command, response)}
                energyData={energyData}
              />
            </div>

            {/* Add Energy Prediction */}
            <div className="card prediction-card">
              <EnergyPrediction 
                historicalData={{
                  week: {
                    data: energyData.data,
                    labels: energyData.labels
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
