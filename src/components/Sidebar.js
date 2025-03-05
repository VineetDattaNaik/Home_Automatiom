import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      <div className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>Energy Monitor</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={closeMobileMenu}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={location.pathname === '/devices' ? 'active' : ''}>
              <Link to="/devices" onClick={closeMobileMenu}>
                <i className="fas fa-plug"></i>
                <span>Devices</span>
              </Link>
            </li>
            <li className={location.pathname === '/analytics' ? 'active' : ''}>
              <Link to="/analytics" onClick={closeMobileMenu}>
                <i className="fas fa-chart-line"></i>
                <span>Analytics</span>
              </Link>
            </li>
            <li className={location.pathname === '/settings' ? 'active' : ''}>
              <Link to="/settings" onClick={closeMobileMenu}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu} />
      )}
    </>
  );
};

export default Sidebar;
