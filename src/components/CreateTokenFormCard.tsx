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
        .setMaxSupply(500)
        .setSupplyKey(supplyKey)
        .freezeWithSigner(signer);

      const executeResult = await executeTransaction(
        AccountId.fromString(fromAccountId),
        frozenTransaction
      );
      console.log("Transaction Result:", executeResult);
      alert("Token Created Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to Create Token. See console for details.");
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
