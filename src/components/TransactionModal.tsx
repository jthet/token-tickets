import React from "react";
import { useNavigate } from "react-router-dom";
import { EventData } from "../services/api/eventsService";
import "../styles/TransactionModal.css";

const TransactionModal: React.FC<{
  event: EventData | null;
  onClose: () => void;
}> = ({ event, onClose }) => {
  const navigate = useNavigate();

  if (!event) return null; // Prevent rendering if no event data

  const handleBuy = () => {
    // Navigate to the Buy page and pass the event data
    navigate("/buy", { state: { event } });
  };
  
  console.log(event);

  return (
    <div className="transaction-modal-overlay">
      <div className="transaction-modal-content">
        <h2>Event Details</h2>
        <p>
          <strong>Event Name:</strong> {event.tokenName}
        </p>
        <p>
          <strong>Event Token:</strong> {event.tokenSymbol}
        </p>
        <p>
          <strong>Token ID:</strong> {event.tokenId}
        </p>
        <p>
          <strong>Memo:</strong> {event.tokenMemo}
        </p>
        <div className="transaction-modal-actions">
          <button className="transaction-close-button" onClick={onClose}>
            Close
          </button>
          <button className="transaction-buy-button" onClick={handleBuy}>
            Find Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
