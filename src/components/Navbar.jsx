import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ connectWallet, accountId, connectLinkSt }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    if (accountId && connectLinkSt) {
      window.open(connectLinkSt, '_blank', 'noopener,noreferrer'); // Open HashScan link in a new tab
    } else {
      connectWallet(); // Trigger wallet connection if not connected
    }
  };

  return (
    <header className="top-bar py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo-container">
          <img
            src="/path-to-your-logo.png" /* Replace with your logo's path */
            alt="Logo"
            className="logo-img"
          />
          <Link to="/" className="logo fw-bold">
            Token Tickets
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex gap-4 align-items-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/getStarted" className="nav-link">
            Get Started
          </Link>
          <Link to="/marketplace" className="nav-link">
            Marketplace
          </Link>
        </nav>

        {/* Connect Button */}
        <div className="position-relative">
          <button
            className="connect-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {accountId ? (hovered ? accountId : "Connected") : "Connect"}
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  connectWallet: PropTypes.func.isRequired,
  accountId: PropTypes.string,
  connectLinkSt: PropTypes.string,
};

export default Navbar;
