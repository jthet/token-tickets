import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { AppStore, actions } from "../store/index.ts"; // Adjust the path based on your folder structure
import { hc } from "../services/wallet/wallet/hashconnect.ts"; // Import HashConnect client

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  // Access Redux state
  const { isConnected, accountIds, pairingString } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const accountId = accountIds[0]; // Get the first connected account ID

  // Handle wallet connection
  const connectWallet = () => {
    if (!isConnected) {
      hc.openPairingModal(); // Open HashConnect pairing modal
    } else {
      hc.disconnect(); // Disconnect the wallet
      dispatch(actions.hashconnect.setIsConnected(false));
      dispatch(actions.hashconnect.setAccountIds([]));
      dispatch(actions.hashconnect.setPairingString(""));
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    if (accountId && pairingString) {
      window.open(`https://hashscan.io/testnet/account/${accountId}`, "_blank", "noopener,noreferrer"); // Open HashScan link
    } else {
      connectWallet(); // Trigger wallet connection
    }
  };

  return (
    <header className="top-bar py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo-container">
          <img
            src="/assets/tokenTicketsLogo.png"
            alt="Logo"
            className="logo-img-inverted align-items-center"
          />
          <Link to="/" className="d-flex logo fw-bold align-items-center">
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
            {isConnected
              ? hovered
                ? accountId || "No Account"
                : "Connected"
              : "Connect"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
