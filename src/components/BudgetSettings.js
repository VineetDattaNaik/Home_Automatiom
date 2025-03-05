import React, { useState, useEffect } from 'react';
import './BudgetSettings.css';

const BudgetSettings = ({ currentSettings, onSave }) => {
  const [settings, setSettings] = useState(currentSettings);

  // Update settings when currentSettings changes
  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="budget-settings-card">
      <h2>Energy Budget Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Daily Energy Budget (kWh)</label>
          <input
            type="number"
            name="dailyBudget"
            value={settings.dailyBudget}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Weekly Energy Budget (kWh)</label>
          <input
            type="number"
            name="weeklyBudget"
            value={settings.weeklyBudget}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Monthly Energy Budget (kWh)</label>
          <input
            type="number"
            name="monthlyBudget"
            value={settings.monthlyBudget}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Alert Threshold (%)</label>
          <input
            type="number"
            name="alertThreshold"
            value={settings.alertThreshold}
            onChange={handleChange}
            min="1"
            max="100"
            required
          />
          <small>Get alerts when usage reaches this percentage of your budget</small>
        </div>
        <button type="submit" className="save-button">Save Budget Settings</button>
      </form>
    </div>
  );
};

export default BudgetSettings;
