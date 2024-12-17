import React, { useState } from "react";
import {
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} from "@hashgraph/sdk";
import { executeTransaction, hc } from "../services/wallet/wallet/hashconnect.ts";
import { useSelector } from "react-redux";
import "../styles/CreateTokenFormCard.css"; // Add specific styling
import { AppStore } from "../store";
import axios from "axios";

interface TokenFormCardProps {
  connectedAccountIds: string[];
  onClose: () => void;
}

const CreateTokenFormCard: React.FC<TokenFormCardProps> = ({
  onClose,
}) => {

  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );
  
  const fromAccountId = connectedAccountIds[0]; // Assume a single connected account

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenMemo, setTokenMemo] = useState("");
  const [maxSupply, setMaxSupply] = useState(1000);

  const handleCreateToken = async () => {
    try {
      if (!fromAccountId) {
        alert("No connected account found.");
        return;
      }

      const supplyKey = PrivateKey.generateED25519();
      const signer = hc.getSigner(AccountId.fromString(fromAccountId));

      const frozenTransaction = await new TokenCreateTransaction()
        .setTokenName(tokenName || "Default Token Name")
        .setTokenSymbol(tokenSymbol || "DEFAULT")
        .setTokenMemo(tokenMemo || "No Memo Provided")
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(fromAccountId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(maxSupply || 1000)
        .setSupplyKey(supplyKey)
        .freezeWithSigner(signer);

      const executeResult = await executeTransaction(
        AccountId.fromString(fromAccountId),
        frozenTransaction
      );

      console.log("Transaction Result:", executeResult);
      

      // Save event to database
      // Extract details from the transaction
      const eventDetails = {
        tokenId: executeResult.tokenId
          ? executeResult.tokenId.toString()
          : "Unknown",
        supplyKey: supplyKey.toString(),
        tokenName: tokenName || "Default Token Name",
        tokenSymbol: tokenSymbol || "DEFAULT",
        tokenMemo: tokenMemo || "",
        maxSupply: maxSupply,
        transactionStatus: executeResult.status.toString(),
        organizerAccountId: fromAccountId,
      };

      // Send event details to the backend
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/events`,
          eventDetails,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );
        console.log("Event saved to db successfully!");
      } catch (err) {
        console.error("Failed to save the event in the database:", err);
      }
      alert("Token created successfully and event saved!");

      onClose();
    } catch (err) {
      console.error("Error creating token:", err);
      alert("Failed to create token. See console for details.");
    }
  };

  return (
    <div className="token-form-card-overlay">
      <div className="token-form-card">
        <h2>Create a Token</h2>
        <div className="token-form-inputs">
          <div>
            <label>Event Organizer:</label>
            <input
              type="text"
              value={fromAccountId || "No connected account"}
              disabled
              style={{ backgroundColor: "#444", color: "#d3d3d3" }}
            />
          </div>

          {/* Token Name */}
          <div>
            <label>Token Name:</label>
            <input
              type="text"
              placeholder="Enter Token Name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>

          {/* Token Symbol */}
          <div>
            <label>Token Symbol:</label>
            <input
              type="text"
              placeholder="Enter Token Symbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
          </div>

          {/* Token max supply */}
          <div>
            <label>Max Supply:</label>
            <input
              type="text"
              placeholder="Enter Token Symbol"
              value={maxSupply}
              onChange={(e) => setMaxSupply(Number(e.target.value))}
            />
          </div>

          {/* Token Memo */}
          <div>
            <label>Memo:</label>
            <input
              type="text"
              placeholder="Enter Memo"
              value={tokenMemo}
              onChange={(e) => setTokenMemo(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="token-form-actions">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <button className="cta-button" onClick={handleCreateToken}>
            Create Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTokenFormCard;
