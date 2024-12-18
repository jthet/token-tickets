import React, { useState, useEffect } from "react";
import {
  AccountId,
  PrivateKey,
  TokenMintTransaction,
  Hbar,
  AccountAllowanceApproveTransaction,
} from "@hashgraph/sdk";
import {
  executeTransaction,
  hc,
} from "../services/wallet/wallet/hashconnect.ts";
import axios from "axios";
import { Buffer } from "buffer";
import "../styles/MintTokenCard.css";
import { AppStore } from "../store/index.ts";
import { useSelector } from "react-redux";

interface MintTokenCardProps {
  onClose: () => void;
}

const MintTokenCard: React.FC<MintTokenCardProps> = ({ onClose }) => {
  const { accountIds: connectedAccountIds } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const [tokenId, setTokenId] = useState("");
  const [tokens, setTokens] = useState<
    { tokenId: string; tokenName: string }[]
  >([]);
  const [metadataEntries, setMetadataEntries] = useState<
    { metadata: string; price: number }[]
  >([]);
  const [newMetadata, setNewMetadata] = useState("");
  const [newPrice, setNewPrice] = useState<number | null>(null); // Use null to represent no initial price
  const [maxTransactionFee, setMaxTransactionFee] = useState<number>(10);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/get-events`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );
        setTokens(response.data);
      } catch (err) {
        console.error("Error fetching tokens:", err);
        alert("Failed to load tokens. Please try again later.");
      }
    };
    fetchTokens();
  }, []);

  const validateMetadata = (url: string): boolean => {
    const ipfsRegex = /^ipfs:\/\/[a-zA-Z0-9]+\/?.*$/;
    return ipfsRegex.test(url);
  };

  const handleAddMetadata = () => {
    if (!newMetadata) {
      setErrorMessage("Metadata URL cannot be empty.");
      return;
    }
    if (!validateMetadata(newMetadata)) {
      setErrorMessage("Invalid IPFS URL. Format: ipfs://CID/metadata.json");
      return;
    }
    if (metadataEntries.length >= 10) {
      setErrorMessage("You can only mint up to 10 NFTs at a time.");
      return;
    }
    if (newPrice === null || newPrice <= 0) {
      setErrorMessage("Price must be a positive number.");
      return;
    }

    setMetadataEntries((prev) => [
      ...prev,
      { metadata: newMetadata, price: newPrice },
    ]);
    setNewMetadata("");
    setErrorMessage("");
  };

  const handleRemoveMetadata = (index: number) => {
    setMetadataEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMintTokens = async () => {
    try {
      if (!tokenId || metadataEntries.length === 0) {
        alert("Please select a Token ID and add metadata entries.");
        return;
      }

      const fromAccountId = connectedAccountIds[0];
      if (!fromAccountId) {
        alert("No connected account found.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/get-event/${tokenId}`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      const { supplyKey } = response.data;

      const CID = metadataEntries.map((entry) => Buffer.from(entry.metadata));
      const signer = hc.getSigner(AccountId.fromString(fromAccountId));

      const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata(CID)
        .setMaxTransactionFee(new Hbar(maxTransactionFee))
        .freezeWithSigner(signer);

      const mintTxSign = await mintTx.sign(PrivateKey.fromStringDer(supplyKey));
      const exTxn = await executeTransaction(
        AccountId.fromString(fromAccountId),
        mintTxSign
      );

      console.log("Tokens minted successfully!", exTxn);

      const serials = exTxn.serials.map((serial) => serial.toString());

      const ticketPromises = serials.map((serial, index) =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/tickets`,
          {
            tokenId,
            tokenName: response.data.tokenName,
            tokenSymbol: response.data.tokenSymbol,
            serialNumber: serial,
            price: metadataEntries[index].price,
            ownerAccount: fromAccountId,
          },
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        )
      );

      await Promise.all(ticketPromises);

      console.log("Tickets created successfully!");

      console.log("Initiaiting allowance approval...");

      const tokenTicketsAccountId = process.env.REACT_APP_TOKEN_TICKETS_ACCOUNT_ID;

      if (!tokenTicketsAccountId) {
        throw new Error("Token Tickets Account ID is not defined.");
      }

      const allowanceTx = await new AccountAllowanceApproveTransaction()
        .approveTokenNftAllowanceAllSerials(
          tokenId,
          AccountId.fromString(fromAccountId),
          AccountId.fromString(tokenTicketsAccountId)
        )
        .freezeWithSigner(signer);

      const allowanceTxSign = await allowanceTx.sign(
        PrivateKey.fromStringDer(supplyKey)
      );
      const allowanceApproveNftRx = await executeTransaction(
        AccountId.fromString(fromAccountId),
        allowanceTxSign
      );
      console.log(`- Allowance approval status: ${allowanceApproveNftRx.status}`);
    
      console.log(allowanceApproveNftRx);

      setMetadataEntries([]);
      onClose();
    } catch (err: any) {
      console.error("Error minting tokens:", err.message || err);
      alert(`Failed to mint tokens: ${err.message || "Unknown error"}`);
    }
  };

  return (
    <div className="mint-token-card-overlay">
      <div className="mint-token-card">
        <h2>Mint Event Tickets</h2>

        {/* Token ID Selection */}
        <div>
          <label>Token ID:</label>
          <select value={tokenId} onChange={(e) => setTokenId(e.target.value)}>
            <option value="">Select a Token</option>
            {tokens.map((token) => (
              <option key={token.tokenId} value={token.tokenId}>
                {token.tokenName} ({token.tokenId})
              </option>
            ))}
          </select>
        </div>

        {/* Metadata Input */}
        <div>
          <label>Metadata (IPFS URL) and Price (HBAR):</label>
          <div className="metadata-input-group">
            <input
              type="text"
              placeholder="ipfs://CID/metadata.json"
              value={newMetadata}
              onChange={(e) => setNewMetadata(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price (HBAR)"
              value={newPrice !== null ? newPrice.toString() : ""}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              style={{ width: "80px", marginLeft: "10px" }}
            />
            <button onClick={handleAddMetadata}>Add Row</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Metadata Table */}
        {metadataEntries.length > 0 && (
          <div>
            <h4>Metadata Entries:</h4>
            <table className="metadata-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Metadata</th>
                  <th>Price (HBAR)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {metadataEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {entry.metadata.length > 20
                        ? `${entry.metadata.substring(0, 20)}...`
                        : entry.metadata}
                    </td>
                    <td>{entry.price}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveMetadata(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Max Transaction Fee */}
        <div>
          <label>Max Transaction Fee (Hbar):</label>
          <input
            type="number"
            value={maxTransactionFee}
            onChange={(e) => setMaxTransactionFee(Number(e.target.value))}
          />
        </div>

        {/* Actions */}
        <div className="mint-form-actions">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <button className="cta-button" onClick={handleMintTokens}>
            Mint Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintTokenCard;
