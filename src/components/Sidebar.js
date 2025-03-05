import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Energy Monitor</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={location.pathname === '/devices' ? 'active' : ''}>
            <Link to="/devices">Devices</Link>
          </li>
          <li className={location.pathname === '/analytics' ? 'active' : ''}>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li className={location.pathname === '/settings' ? 'active' : ''}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
