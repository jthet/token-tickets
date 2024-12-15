import React from "react";
import "../styles/About.css";
import HederaLogo from "../assets/hederaLogo.png";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">
            About <span className="highlight">Token Tickets</span>
          </h1>
          <p className="about-subtitle">
            Revolutionizing ticketing with blockchain technology.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-introduction">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At Token Tickets, we aim to transform the way tickets are issued,
            shared, and managed. By leveraging the power of blockchain and NFTs,
            we ensure secure, transparent, and effortless ticketing for events
            worldwide.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <h2>What Makes Us Different?</h2>
          <ul className="features-list">
            <li>
              <strong>Low Cost:</strong> Reduce ticketing fees with Hedera's low
              cost network.
            </li>
            <li>
              <strong>Transparency:</strong> Blockchain ensures every ticket is
              verifiable and secure.
            </li>
            <li>
              <strong>Fraud Prevention:</strong> Say goodbye to counterfeit
              tickets with NFT-based solutions.
            </li>
            <li>
              <strong>Seamless Transfers:</strong> Transfer tickets quickly and
              securely between attendees.
            </li>
            <li>
              <strong>Global Access:</strong> Manage your tickets from anywhere,
              at any time.
            </li>
          </ul>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Join the Revolution</h2>
          <p>
            Token Tickets is more than a platform; it’s a movement to empower
            event organizers and attendees alike. Be part of a transparent and
            secure future for ticketing.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
      {/* GitHub and Hedera Section */}
      <section className="github-section">
        <div className="container d-flex justify-content-center gap-4">
          {/* GitHub Link */}
          <a
            href="https://github.com/jthet/token-tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-button"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="logo"
            />
          </a>

          {/* Hedera Link */}
          <a
            href="https://hedera.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-button"
          >
            <img src={HederaLogo} alt="Hedera" className="logo"  />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
