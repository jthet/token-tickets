import React, { useState } from "react";
import { EventData } from "../services/api/eventsService";
import TransactionModal from "./TransactionModal.tsx";
import "../styles/AllEvents.css";


interface AllEventsProps {
  events: EventData[];
  loading: boolean;
  error: string | null;
}

const AllEvents: React.FC<AllEventsProps> = ({ events, loading, error }) => {
  const [visibleCount, setVisibleCount] = useState<number>(9); // Show 9 cards initially

  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null); // Selected card
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility

  const handleCardClick = (event: EventData) => {
    setSelectedEvent(event); // Store event data
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedEvent(null); // Clear selected event
  };

  // Handle Show More button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 9); // Load 9 more cards
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const totalEvents = events.length;

  return (
    <div className="events-wrapper">
      {/* Rotating Cards Section */}
      <div className="horizontal-events-container">
        {totalEvents === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="horizontal-cards">
            {events.map((event, index) => {
              const delay = `${index * 3}s`;
              return (
                <div
                  key={index}
                  className="event-card"
                  style={{
                    animationDelay: delay,
                  }}
                  onClick={() => handleCardClick(event)}
                >
                  <div className="card-content">
                    <h3 className="event-title">
                      {event.tokenName} ({event.tokenSymbol})
                    </h3>
                    <p>
                      <strong>Token ID:</strong> {event.tokenId}
                    </p>
                    <p>
                      <strong>Memo:</strong> {event.tokenMemo}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Static Grid Section */}
      <div className="static-events-container">
        <h2>All Events</h2>
        <div className="event-grid">
          {events.slice(0, visibleCount).map((event, index) => (
            <div
              key={index}
              className="grid-event-card"
              onClick={() => handleCardClick(event)}
            >
              <div className="card-content">
                <h3 className="event-title">
                  {event.tokenName} ({event.tokenSymbol})
                </h3>
                <p>
                  <strong>Token ID:</strong> {event.tokenId}
                </p>
                <p>
                  <strong>Memo:</strong> {event.tokenMemo}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Show More Button */}
        {visibleCount < events.length && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
      {/* Transaction Modal */}
      {showModal && (
        <TransactionModal event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllEvents;
