import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // eslint-disable-line
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import Marketplace from "./pages/Marketplace.tsx";
import "./styles/App.css";
import walletConnect from "./services/wallet/wallet/walletConnect";

function App() {
  const [accountId, setAccountId] = useState(undefined);
  const [connectLinkSt, setConnectLinkSt] = useState("");
  const [hashconnect, setHashconnect] = useState(null);
  const [pairingData, setPairingData] = useState(null);

  const connectWallet = async () => {
    if (accountId) {
      console.log(`Account ${accountId} already connected`);
    } else {
      try {
        const hashconnectInstance = await walletConnect();
        setHashconnect(hashconnectInstance);

        hashconnectInstance.pairingEvent.on((pairingData) => {
          const connectedAccountId = pairingData.accountIds[0];
          setAccountId(connectedAccountId);
          setPairingData(pairingData); // Save pairing data
          console.log("HashConnect Instance:", hashconnectInstance);
          console.log("Pairing Data:", pairingData);
          setConnectLinkSt(
            `https://hashscan.io/testnet/account/${connectedAccountId}`
          );
        });
      } catch (error) {
        console.error("Error connecting wallet:", error.message);
      }
    }
  };

  return (
    // Router wraps this in index.js
    <div className="bg-black text-white min-vh-100">
      <Navbar
        connectWallet={connectWallet}
        accountId={accountId}
        connectLinkSt={connectLinkSt}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </div>
  );
}

export default App;
