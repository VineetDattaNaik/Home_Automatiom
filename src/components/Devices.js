import React, { useState, useEffect } from 'react';
import './Devices.css';

//const API_BASE_URL = 'https://ha-server-j5j7.onrender.com';

const Devices = () => {
  const [devices, setDevices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://ha-server-j5j7.onrender.com/api/devices`);
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4ade80';
      case 'partial':
        return '#fbbf24';
      case 'inactive':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const toggleDevice = async (deviceName) => {
    const newStatus = devices[deviceName].status === 'active' ? 'inactive' : 'active';
    try {
      const response = await fetch(`https://ha-server-j5j7.onrender.com/api/devices/${deviceName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update device status');
      }

      const updatedDevice = await response.json();
      setDevices(prev => ({
        ...prev,
        [deviceName]: updatedDevice,
      }));
    } catch (error) {
      console.error('Error updating device:', error);
      // Optionally show an error message to the user
    }
  };

  if (isLoading) {
    return <div className="devices">Loading...</div>;
  }

  if (error) {
    return <div className="devices">Error: {error}</div>;
  }

  return (
    <div className="devices">
      <div className="devices-header">
        <h1>Connected Devices</h1>
      </div>
      <div className="devices-grid">
        {devices && Object.entries(devices).map(([deviceName, data]) => (
          <div className="device-card" key={deviceName}>
            <div className="device-header">
              <h2>{deviceName}</h2>
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(data.status) }}
              />
            </div>
            <div className="device-info">
              <div className="info-row">
                <span>Status:</span>
                <span className="status" style={{ color: getStatusColor(data.status) }}>
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </span>
              </div>
              <div className="info-row">
                <span>Location:</span>
                <span>{data.location}</span>
              </div>
              <div className="info-row">
                <span>Power Rating:</span>
                <span>{data.powerRating}</span>
              </div>
              <div className="info-row">
                <span>Current Usage:</span>
                <span>{data.usage} kWh</span>
              </div>
              <div className="info-row">
                <span>Usage Share:</span>
                <span>{data.percentage}%</span>
              </div>
              <div className="info-row">
                <span>Last Active:</span>
                <span>{data.lastActive}</span>
              </div>
            </div>
            <button 
              className={`device-toggle ${data.status}`}
              onClick={() => toggleDevice(deviceName)}
            >
              {data.status === 'active' ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
