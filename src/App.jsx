import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // eslint-disable-line
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import Organizers from "./pages/Organizers.tsx";
import Marketplace from "./pages/Marketplace.tsx";
import "./styles/App.css";

function App() {

  return (
    // Router wraps this in index.js
    <div className="bg-black text-white min-vh-100">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/organizers" element={<Organizers />} />
      </Routes>
    </div>
  );
}

export default App;
