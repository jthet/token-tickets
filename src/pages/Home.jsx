import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
