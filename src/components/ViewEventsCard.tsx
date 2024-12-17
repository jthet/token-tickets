import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppStore } from "../store";
import { useSelector } from "react-redux";
import "../styles/ViewEventsCard.css";
import { Link } from "react-router-dom";

interface Event {
  tokenId: string;
  tokenName: string;
  tokenMemo: string;
  supplyKey: string;
  maxSupply: number;
}

const ViewEventsCard: React.FC = () => {
  const { accountIds: connectedAccountIds } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // State to track clicked item

  const organizerAccountId = connectedAccountIds[0];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/get-events-by-organizer/${organizerAccountId}`
        );
        setEvents(response.data);
      } catch (err: any) {
        console.error("Error fetching events:", err.message || err);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizerAccountId]);

  const toggleDetails = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  console.log("Fetched Events:", events);

  return (
    <div className="view-events-container">
      <div className="view-events-header">Your Events</div>
      {events.map((event, index) => (
        <div
          key={index}
          className={`event-item ${activeIndex === index ? "active" : ""} centered`}
          onClick={() => toggleDetails(index)}
        >
          <div className="event-name ">
            {event.tokenName || "Unnamed Event"}
          </div>
          {activeIndex === index && (
            <div className="event-details">
              <span>
                <strong>Token ID:</strong> {event.tokenId}
              </span>
              <span>
                <strong>Memo:</strong> {event.tokenMemo || "N/A"}
              </span>
              <span>
                <strong>Supply Key:</strong>
                {event.supplyKey}
                <span className="tooltip" data-tooltip={event.supplyKey}>
                  <span className="truncated-text">{event.supplyKey}</span>
                </span>
              </span>
              <span>
                <strong>Max Supply:</strong> {event.maxSupply}
              </span>
              <span>
                <Link
                  to={`https://hashscan.io/testnet/token/${event.tokenId}`}
                  className="hashscan-link"
                  target="_blank" /* Opens link in a new tab */
                  rel="noopener noreferrer" /* Security best practice */
                >
                  <strong>
                    View on Hashscan
                  </strong>
                </Link>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewEventsCard;

