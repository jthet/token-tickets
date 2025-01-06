import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section text-center">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="https://github.com/jthet/token-tickets/issues">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://github.com/jthet/token-tickets/wiki">FAQs</a>
              </li>
              <li>
                <a href="https://github.com/jthet/token-tickets">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="https://github.com/jthet/token-tickets?tab=readme-ov-file#license">
                  Privacy Policy
                </a>
              </li>
              <li>
                <div>
                  
                </div>
              </li>

              <li>
                <a
                  href="https://github.com/jthet/token-tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="GitHub"
                    className="github-logo-footer"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2025 Token Tickets. All Rights Reserved. Powered by Hedera
            Hashgraph.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
