import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../styles/Button.css';

const Button = ({ label, variant }) => {
  const className =
    variant === 'primary'
      ? 'btn btn-purple btn-lg'
      : 'btn btn-outline-light btn-lg';
  return <button className={className}>{label}</button>;
};

// PropTypes Validation
Button.propTypes = {
  label: PropTypes.string.isRequired, // 'label' must be a string and is required
  variant: PropTypes.oneOf(['primary', 'outline']).isRequired, // 'variant' must be one of these two options
};

export default Button;
