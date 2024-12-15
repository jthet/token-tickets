import React from "react";
import "../styles/InfoSection.css";

const InfoSection = () => {
  return (
    <section className="info-section py-5">
      <div className="container info-container">
        <div className="row align-items-center">
          {/* Left Side: Icon and Text */}
          <div className="col-md-6 text-center text-md-start">
            <div className="icon-circle mb-4">
              <i className="fas fa-coins fa-3x"></i>
            </div>
            <h3 className="info-title">Secure NFT-Based Event Ticketing</h3>
            <p className="info-text">
              Token Tickets is a secure, NFT-based event ticketing platform
              built for the Web3 era, leveraging Hedera's consensus network.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="col-md-6 text-center">
            <div className="info-image-wrapper">
              <img
                src="https://via.placeholder.com/500x300"
                alt="Currency"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
