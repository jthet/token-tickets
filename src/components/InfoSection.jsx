import React from 'react';
import '../styles/InfoSection.css';

const InfoSection = () => {
  return (
    <section className="info-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="icon-circle bg-purple mb-4">
              <i className="fas fa-coins fa-3x text-white"></i>
            </div>
            <h3 className="text-purple">The World's First Unbiased Currency</h3>
            <p className="text-white-50 text-center">
              MyApp provides a decentralized, stable platform that works for
              everyone. Empower your finances with the benefits of digital
              currency.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Currency"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
