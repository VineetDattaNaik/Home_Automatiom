import React from 'react';

const EnergyUsageCard = ({ appliance, usage }) => {
  return (
    <div className="card">
      <h3>{appliance}</h3>
      <div className="usage-amount">
        <span>{usage}</span>
        <span className="unit">kWh</span>
      </div>
    </div>
  );
};

export default EnergyUsageCard;