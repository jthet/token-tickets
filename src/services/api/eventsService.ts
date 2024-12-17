import axios from "axios";

// Event data interface
export interface EventData {
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenMemo: string;
}

// Fetch unique events from the backend
export const fetchUniqueEvents = async (): Promise<EventData[]> => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/events/unique-events",
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return response.data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching unique events:", err);
    throw new Error("Failed to fetch events. Please try again later.");
  }
};
