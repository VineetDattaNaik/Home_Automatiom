
import React from 'react';
import './BudgetAlert.css';

const BudgetAlert = ({ currentUsage, budget, alertThreshold, period }) => {
  const usagePercentage = (currentUsage / budget) * 100;
  const isExceeding = usagePercentage >= 100;
  const isNearLimit = usagePercentage >= alertThreshold;

  if (!isNearLimit && !isExceeding) return null;

  const getPeriodText = () => {
    switch (period) {
      case 'today':
        return 'daily';
      case 'week':
        return 'weekly';
      case 'month':
        return 'monthly';
      default:
        return 'monthly';
    }
  };

  return (
    <div className={`budget-alert ${isExceeding ? 'exceeding' : 'warning'}`}>
      <div className="budget-alert-content">
        <div className="budget-alert-icon">
          {isExceeding ? '⚠️' : '⚡'}
        </div>
        <div className="budget-alert-text">
          <h3>{isExceeding ? 'Budget Exceeded!' : 'Budget Alert'}</h3>
          <p>
            {isExceeding 
              ? `You've exceeded your ${getPeriodText()} budget of ${budget} kWh`
              : `You've used ${usagePercentage.toFixed(1)}% of your ${getPeriodText()} budget`
            }
          </p>
          <div className="budget-progress">
            <div 
              className="budget-progress-bar" 
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <p className="budget-details">
            {currentUsage} kWh / {budget} kWh
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetAlert;
