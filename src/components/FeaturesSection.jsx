import React from "react";
import FeatureCard from "./FeatureCard";
import "../styles/FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section bg-black text-center py-5">
      <div className="container">
        <h2 className="text-purple mb-4">Why Choose Token Tickets?</h2>

        {/* First Features Section */}
        <div className="features-container">
          <FeatureCard
            iconClass="fas fa-globe"
            title="Global Access"
            description="Manage your assets from anywhere in the world, anytime."
          />
          <FeatureCard
            iconClass="fas fa-lock"
            title="Secure Transactions"
            description="Your data and transactions are protected with state-of-the-art security protocols."
          />
          <FeatureCard
            iconClass="fas fa-bolt"
            title="Fast & Reliable"
            description="Experience lightning-fast speeds and seamless reliability."
          />
        </div>

        {/* Additional Features Section */}
        <div className="about-features-container">
          <FeatureCard
            iconClass="fas fa-check-circle"
            title="Transparency"
            description="All tickets are securely issued on the blockchain."
          />
          <FeatureCard
            iconClass="fas fa-shield-alt"
            title="Fraud Prevention"
            description="Prevent counterfeit tickets with secure NFT-based tokens."
          />
          <FeatureCard
            iconClass="fas fa-exchange-alt"
            title="Seamless Transfers"
            description="Transfer tickets quickly, securely, and effortlessly."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
