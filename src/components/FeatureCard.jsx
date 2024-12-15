import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../styles/FeatureCard.css';

const FeatureCard = ({ iconClass, title, description }) => {
  return (
    <div className="feature-card p-4">
      <i className={`${iconClass} fa-3x text-purple mb-3`}></i>
      <h4 className="text-white">{title}</h4>
      <p className="text-white-50">{description}</p>
    </div>
  );
};

// Define PropTypes
FeatureCard.propTypes = {
  iconClass: PropTypes.string.isRequired, // Must be a string and is required
  title: PropTypes.string.isRequired, // Must be a string and is required
  description: PropTypes.string.isRequired, // Must be a string and is required
};

export default FeatureCard;
