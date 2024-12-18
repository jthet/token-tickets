import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Buy.css";
import { handleBuyTicket } from "../services/wallet/tokens/buyToken.ts";
import { AppStore } from "../store/index.ts";
import { useSelector } from "react-redux";

interface EventData {
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenMemo: string;
  maxSupply?: number;
  transactionStatus?: string;
  serialNumbers?: number[];
  organizerAccountId?: string;
  supplyKey?: string; // Add supplyKey here
}

interface Ticket {
  tokenId: string;
  serialNumber: number;
  price: number;
  ownerAccount: string;
}

const Buy: React.FC = () => {
  const { accountIds: connectedAccountIds } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const location = useLocation();
  const event = location.state?.event as EventData;

  const [fullEventInfo, setFullEventInfo] = useState<EventData | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [visibleTickets, setVisibleTickets] = useState<Ticket[]>([]);
  const [ticketsToShow, setTicketsToShow] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      if (!event || !event.tokenId) {
        setError("Event data is missing.");
        setLoading(false);
        return;
      }

      try {
        // Fetch full event info
        const eventResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/get-event/${event.tokenId}`,
          {
            headers: { "x-api-key": process.env.REACT_APP_API_KEY },
          }
        );
        const fetchedEvent = eventResponse.data as EventData;
        setFullEventInfo(fetchedEvent);

        // Fetch tickets owned by organizer
        const ticketResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/tickets/get-tickets-by-owner/${fetchedEvent.organizerAccountId}`,
          {
            headers: { "x-api-key": process.env.REACT_APP_API_KEY },
          }
        );

        // Filter tickets by event's tokenId
        const filteredTickets = ticketResponse.data.filter(
          (ticket: Ticket) => ticket.tokenId === fetchedEvent.tokenId
        );

        setTickets(filteredTickets);
        setVisibleTickets(filteredTickets.slice(0, ticketsToShow));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event or tickets:", err);
        setError("Failed to load event or tickets. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventAndTickets();
  }, [event, ticketsToShow]);

  const showMoreTickets = () => {
    const newVisibleTickets = tickets.slice(0, visibleTickets.length + 10);
    setVisibleTickets(newVisibleTickets);
  };

  const handleBuy = async (ticket: Ticket) => {
    try {
      const fromAccountId = connectedAccountIds[0];
      if (!fromAccountId) {
        alert("No connected account found.");
        return;
      }

      if (!fullEventInfo?.supplyKey) {
        alert("Supply key is missing. Cannot process the transaction.");
        return;
      }

      const { tokenId, serialNumber, price, ownerAccount } = ticket;

      console.log(`Buying Ticket ${serialNumber} for ${price} HBAR`);
      const result = await handleBuyTicket(
        tokenId,
        serialNumber,
        fromAccountId,
        price,
        fullEventInfo.supplyKey,
        ownerAccount
      );
      console.log("Transaction Result:", result);
      alert("Ticket purchased successfully!");
    } catch (err: any) {
      console.error("Error buying ticket:", err);
      alert(`Failed to buy ticket: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="buy-page">
        <h1>Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div className="buy-page">
        <h1>Error: {error}</h1>
      </div>
    );

  return (
    <div className="buy-page">
      <div className="buy-header">
        <h1>Buy Tickets</h1>
      </div>
      <div className="buy-content">
        <div className="event-details modern-card">
          <h2>Event Details</h2>
          <p>
            <strong>Token Name:</strong> {fullEventInfo?.tokenName}
          </p>
          <p>
            <strong>Token Symbol:</strong> {fullEventInfo?.tokenSymbol}
          </p>
          <p>
            <strong>Token ID:</strong> {fullEventInfo?.tokenId}
          </p>
          <p>
            <strong>Memo:</strong> {fullEventInfo?.tokenMemo}
          </p>
          <p>
            <strong>Max Supply:</strong> {fullEventInfo?.maxSupply}
          </p>
          <p>
            <strong>Organizer:</strong> {fullEventInfo?.organizerAccountId}
          </p>
        </div>
        <div className="ticket-list modern-card">
          <h2>Available Tickets</h2>
          {visibleTickets.length === 0 ? (
            <p>No tickets available.</p>
          ) : (
            <ul className="ticket-container">
              {visibleTickets.map((ticket) => (
                <li key={ticket.serialNumber} className="ticket-item compact">
                  <div className="ticket-info">
                    <span>Serial #{ticket.serialNumber}</span>
                    <span>Price: {ticket.price} HBAR</span>
                  </div>
                  <button
                    className="buy-ticket-button"
                    onClick={() => handleBuy(ticket)}
                  >
                    Buy
                  </button>
                </li>
              ))}
            </ul>
          )}
          {visibleTickets.length < tickets.length && (
            <button className="show-more-button" onClick={showMoreTickets}>
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;