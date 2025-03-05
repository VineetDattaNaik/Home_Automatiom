
import React, { useState, useEffect } from 'react';
import BudgetSettings from './BudgetSettings';
import './Settings.css';

const Settings = () => {
  const defaultSettings = {
    dailyBudget: 50,
    weeklyBudget: 300,
    monthlyBudget: 1000,
    alertThreshold: 80,
    notifications: 'email'
  };

  const [savedSettings, setSavedSettings] = useState(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage when component mounts
    const storedSettings = localStorage.getItem('energySettings');
    if (storedSettings) {
      setSavedSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleBudgetSave = (budgetSettings) => {
    const newSettings = {
      ...savedSettings,
      ...budgetSettings
    };
    setSavedSettings(newSettings);
    localStorage.setItem('energySettings', JSON.stringify(newSettings));
  };

  const handleNotificationSave = (e) => {
    e.preventDefault();
    const newSettings = {
      ...savedSettings,
      notifications: e.target.notifications.value
    };
    setSavedSettings(newSettings);
    localStorage.setItem('energySettings', JSON.stringify(newSettings));
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      <div className="settings-grid">
        <BudgetSettings
          currentSettings={savedSettings}
          onSave={handleBudgetSave}
        />
        
        <div className="settings-card">
          <h2>Notification Preferences</h2>
          <form onSubmit={handleNotificationSave}>
            <div className="form-group">
              <label>Notification Method</label>
              <select 
                name="notifications"
                value={savedSettings.notifications}
                onChange={(e) => {
                  const newSettings = {
                    ...savedSettings,
                    notifications: e.target.value
                  };
                  setSavedSettings(newSettings);
                }}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Both</option>
              </select>
            </div>
            <button type="submit" className="save-button">
              Save Notification Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
