import React from "react";
import { EventData } from "../services/api/eventsService";
import "../styles/TransactionModal.css";


const TransactionModal: React.FC<{
  event: EventData | null;
  onClose: () => void;
}> = ({ event, onClose }) => {
  if (!event) return null; // Prevent rendering if no event data

  return (
    <div className="transaction-modal-overlay">
      <div className="transaction-modal-content">
        <h2>Transaction Details</h2>
        <p>
          <strong>Token Name:</strong> {event.tokenName}
        </p>
        <p>
          <strong>Token Symbol:</strong> {event.tokenSymbol}
        </p>
        <p>
          <strong>Token ID:</strong> {event.tokenId}
        </p>
        <p>
          <strong>Memo:</strong> {event.tokenMemo}
        </p>
        <button className="transaction-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
