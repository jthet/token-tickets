import React from 'react';
import FeatureCard from './FeatureCard';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features-section bg-black text-center py-5">
      <div className="container">
        <h2 className="text-purple mb-4">Why Choose MyApp?</h2>
        <div className="row">
          <div className="col-md-4">
            <FeatureCard
              iconClass="fas fa-lock"
              title="Secure Transactions"
              description="Your data and transactions are protected with state-of-the-art security protocols."
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              iconClass="fas fa-globe"
              title="Global Access"
              description="Manage your assets from anywhere in the world, anytime."
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              iconClass="fas fa-bolt"
              title="Fast & Reliable"
              description="Experience lightning-fast speeds and seamless reliability."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
