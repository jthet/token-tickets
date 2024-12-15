import React, { useState, useEffect } from 'react';
import Button from './Button';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const words = [
    'Concert',
    'Festival',
    'Rodeo',
    'Rave',
    'Tailgate',
    'Basketball',
    'Broadway Show',
    'Carnival',
    'Hockey',
    'Film Festival',
    'Formula 1',
    'Comedy Show',
    'Symphony',
    'Ticket', // Final word
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (currentWordIndex < words.length - 1) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, 3000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [currentWordIndex, words.length]);

  return (
    <section className="hero bg-black text-center py-5">
      <div className="container">
        <h1 className="display-4 text-white flex-text">
          <span className="static-text">A new way to</span>
          <span className="rotating-word-container">
            <span
              className={`rotating-word ${
                currentWordIndex === words.length - 1 ? 'static-word' : ''
              }`}
            >
              {words[currentWordIndex]}
            </span>
          </span>
        </h1>
        <p className="lead text-white-50">
          Manage your assets anywhere, anytime.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button label="Use MyApp" variant="primary" />
          <Button label="Play Video" variant="outline" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
