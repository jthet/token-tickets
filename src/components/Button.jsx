import React from "react";
import PropTypes from "prop-types";
import "../styles/Button.css";

const Button = ({ label, variant, onClick }) => {
  const className =
    variant === "primary"
      ? "btn btn-purple btn-lg"
      : "btn btn-outline-light btn-lg";
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

// PropTypes Validation
Button.propTypes = {
  label: PropTypes.string.isRequired, // 'label' must be a string and is required
  variant: PropTypes.oneOf(["primary", "outline"]).isRequired, // 'variant' must be one of these two options
  onClick: PropTypes.func, // 'onClick' must be a function (optional)
};

export default Button;
