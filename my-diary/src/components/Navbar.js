import React from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>📖 My Diary</h1>
        </div>
        
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">Welcome, {user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 