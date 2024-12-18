import axios from "axios";
import { data } from "react-router-dom";

//  Event data interface
export interface EventData {
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenMemo: string;
  maxSupply?: number;
  transactionStatus?: string;
  serialNumbers?: number[];
  organizerAccountId?: string;
}

// Fetch unique events from the backend
export const fetchUniqueEvents = async (): Promise<EventData[]> => {
  const api_url = process.env.REACT_APP_BACKEND_URL;
  const url = api_url + "/api/events/unique-events";
  try {
    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return response.data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching unique events:", err);
    throw new Error("Failed to fetch events. Please try again later.");
  }
};

export const fetchEventByTokenId = async (
  tokenId: string
): Promise<EventData> => {
  const api_url = process.env.REACT_APP_BACKEND_URL;
  const url = `${api_url}/api/events/get-event/${tokenId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return response.data; // Return the event data
  } catch (err) {
    console.error(`Error fetching event with tokenId ${tokenId}:`, err);
    throw new Error(
      `Failed to fetch event with tokenId ${tokenId}. Please try again later.`
    );
  }
};