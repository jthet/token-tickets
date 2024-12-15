import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
// import Develop from './pages/Develop';
import './styles/App.css';
import walletConnect from './services/wallet/wallet/walletConnect';

function App() {
  const [accountId, setAccountId] = useState(undefined);
  const [connectLinkSt, setConnectLinkSt] = useState('');

  const connectWallet = async () => {
    if (accountId) {
      console.log(`Account ${accountId} already connected`);
    } else {
      try {
        const hashconnect = await walletConnect(); // Use walletConnect to initialize the connection
        hashconnect.pairingEvent.on((pairingData) => {
          const connectedAccountId = pairingData.accountIds[0]; // First paired account
          setAccountId(connectedAccountId);
          console.log(`- HERE!!!! Paired account id: ${connectedAccountId}`);
          setConnectLinkSt(
            `https://hashscan.io/testnet/account/${connectedAccountId}`
          );
        });
      } catch (error) {
        console.error('Error connecting wallet:', error.message);
      }
    }
  };

  return (
    <Router>
      <div className="bg-black text-white min-vh-100">
        <Navbar
          connectWallet={connectWallet}
          accountId={accountId}
          connectLinkSt={connectLinkSt}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/develop" element={<Develop />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
