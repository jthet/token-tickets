import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    "Basketball",
    "Broadway",
    "Carnival",
    "Comedy Show",
    "Concert",
    "Formula 1",
    "Hockey",
    "Party",
    "Rodeo",
    "Symphony",
    "Tailgate",
    "Ticket", // Final word
  ];

  useEffect(() => {
    if (currentWordIndex < words.length - 1) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, 3000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [currentWordIndex, words.length]);

  const goToAboutPage = () => {
    console.log("Navigating to /about"); // Debug log
    navigate("/about");
  };

  const goToMarketplacePage = () => {
    console.log("Navigating to /marketplace"); // Debug log
    navigate("/marketplace");
  };

  return (
    <section className="hero bg-black text-center py-5">
      <div className="container">
        <h1 className="display-4 text-white flex-text">
          <span className="static-text">A new way to</span>
          <span className="rotating-word-container">
            <span
              className={`rotating-word ${
                currentWordIndex === words.length - 1 ? "static-word" : ""
              }`}
            >
              {words[currentWordIndex]}
            </span>
          </span>
        </h1>
        <p className="lead text-white-50">
          Event tickets anytime, anywhere.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            label="Learn More"
            variant="primary"
            onClick={goToAboutPage} // Navigate to About page
          />
          <Button
            label="Launch App"
            variant="outline"
            onClick={goToMarketplacePage} // Navigate to Marketplace page
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
