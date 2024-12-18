require("dotenv").config(); // Load environment variables
const axios = require("axios");

const API_BASE_URL = `http://localhost:${process.env.PORT}/api`; // Use PORT from .env
const API_KEY = process.env.API_KEY; // Use API_KEY from .env

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY, // Add API key to headers
};

const testRoutes = async () => {
  try {
    console.log("=== Testing Event Routes ===");

    // Test POST /api/events (Create an event)
    const newEvent = {
      tokenId: "0.0.123456",
      supplyKey: "exampleSupplyKey123",
      tokenName: "Music Festival 2024",
      tokenSymbol: "MUSFEST",
      tokenMemo: "A 3-day outdoor music festival",
      maxSupply: 5000,
      transactionStatus: "SUCCESS",
      serialNumbers: [1, 2, 3, 4, 5],
      organizerAccountId: "0.0.789101",
    };
    const eventResponse = await axios.post(`${API_BASE_URL}/events`, newEvent, { headers });
    console.log("POST /events:", eventResponse.data);

    // Test GET /api/events/get-events
    const getAllEventsResponse = await axios.get(`${API_BASE_URL}/events/get-events`, { headers });
    console.log("GET /events/get-events:", getAllEventsResponse.data);

    // Test GET /api/events/get-event/:tokenId
    const tokenId = "0.0.123456";
    const getEventResponse = await axios.get(`${API_BASE_URL}/events/get-event/${tokenId}`, { headers });
    console.log("GET /events/get-event/:tokenId:", getEventResponse.data);

    // Test POST /api/events/update-serials/:tokenId
    const updateSerialsPayload = { serials: [6, 7, 8] };
    const updateSerialsResponse = await axios.post(
      `${API_BASE_URL}/events/update-serials/${tokenId}`,
      updateSerialsPayload,
      { headers }
    );
    console.log("POST /events/update-serials/:tokenId:", updateSerialsResponse.data);

    // Test GET /api/events/get-events-by-organizer/:organizerAccountId
    const organizerAccountId = "0.0.789101";
    const getEventsByOrganizerResponse = await axios.get(
      `${API_BASE_URL}/events/get-events-by-organizer/${organizerAccountId}`,
      { headers }
    );
    console.log("GET /events/get-events-by-organizer/:organizerAccountId:", getEventsByOrganizerResponse.data);

    // Test GET /api/events/unique-events
    const uniqueEventsResponse = await axios.get(`${API_BASE_URL}/events/unique-events`, { headers });
    console.log("GET /events/unique-events:", uniqueEventsResponse.data);

    console.log("=== Testing Ticket Routes ===");

    // Test POST /api/tickets (Create a ticket)
    const newTicket = {
      tokenId: "0.0.123456",
      tokenName: "Music Festival 2024",
      tokenSymbol: "MUSFEST",
      serialNumber: 1,
      price: 99.99,
      ownerAccount: "0.0.654321",
    };
    const ticketResponse = await axios.post(`${API_BASE_URL}/tickets`, newTicket, { headers });
    console.log("POST /tickets:", ticketResponse.data);

    // Test GET /api/tickets/get-tickets/:tokenId
    const getTicketsResponse = await axios.get(`${API_BASE_URL}/tickets/get-tickets/0.0.123456`, { headers });
    console.log("GET /tickets/get-tickets/:tokenId:", getTicketsResponse.data);

    // Test GET /api/tickets/get-ticket/:tokenId/:serialNumber
    const serialNumber = 1;
    const getTicketResponse = await axios.get(
      `${API_BASE_URL}/tickets/get-ticket/0.0.123456/${serialNumber}`,
      { headers }
    );
    console.log("GET /tickets/get-ticket/:tokenId/:serialNumber:", getTicketResponse.data);

    // Test POST /api/tickets/update-owner/:tokenId/:serialNumber
    const updateOwnerPayload = { ownerAccount: "0.0.112233" };
    const updateOwnerResponse = await axios.post(
      `${API_BASE_URL}/tickets/update-owner/0.0.123456/${serialNumber}`,
      updateOwnerPayload,
      { headers }
    );
    console.log("POST /tickets/update-owner/:tokenId/:serialNumber:", updateOwnerResponse.data);

    // Test GET /api/tickets/get-tickets-by-owner/:ownerAccount
    const ownerAccount = "0.0.112233";
    const getTicketsByOwnerResponse = await axios.get(
      `${API_BASE_URL}/tickets/get-tickets-by-owner/${ownerAccount}`,
      { headers }
    );
    console.log("GET /tickets/get-tickets-by-owner/:ownerAccount:", getTicketsByOwnerResponse.data);

    // Test DELETE /api/tickets/delete-ticket/:tokenId/:serialNumber
    const deleteTicketResponse = await axios.delete(
      `${API_BASE_URL}/tickets/delete-ticket/0.0.123456/${serialNumber}`,
      { headers }
    );
    console.log("DELETE /tickets/delete-ticket/:tokenId/:serialNumber:", deleteTicketResponse.data);

    console.log("All routes tested successfully!");
  } catch (error) {
    console.error("Error during testing:", error.response?.data || error.message);
  }
};

testRoutes();

