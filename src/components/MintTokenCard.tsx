import React, { useState, useEffect } from "react";
import {
  AccountId,
  PrivateKey,
  TokenMintTransaction,
  Hbar,
} from "@hashgraph/sdk";
import {
  executeTransaction,
  signTransaction,
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
  const [metadata, setMetadata] = useState<string[]>([]);
  const [newMetadata, setNewMetadata] = useState("");
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
    if (metadata.length >= 10) {
      setErrorMessage("You can only mint up to 10 NFTs at a time.");
      return;
    }

    setMetadata((prev) => [...prev, newMetadata]);
    setNewMetadata("");
    setErrorMessage("");
  };

  const handleRemoveMetadata = (index: number) => {
    setMetadata((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMintTokens = async () => {
    try {
      if (!tokenId || metadata.length === 0) {
        alert("Please select a Token ID and add metadata entries.");
        return;
      }
      const fromAccountId = connectedAccountIds[0];
      if (!fromAccountId) {
        alert("No connected account found.");
        return;
      }


      // get supply key from backend database
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/get-event/${tokenId}`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      const { supplyKey } = response.data;

      const CID = metadata.map((item) => Buffer.from(item));
      const signer = hc.getSigner(AccountId.fromString(fromAccountId));

      const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata(CID)
        .setMaxTransactionFee(new Hbar(maxTransactionFee))
        .freezeWithSigner(signer);

      const mintTxSign = await mintTx.sign(PrivateKey.fromStringDer(supplyKey));

      const exTxn = await executeTransaction(AccountId.fromString(fromAccountId), mintTxSign);

      console.log("Tokens minted successfully!", exTxn);

      const serials = exTxn.serials.map((serial) => serial.toString());
      
      const payload = {
        serials: serials,
      };

      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/update-serials/${tokenId}`,
        payload,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      console.log('Payload: ', payload);
      console.log("Serials updated in database: ", result);

      
      setMetadata([]);
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
          <label>Metadata (IPFS URL):</label>
          <div className="metadata-input-group">
            <input
              type="text"
              placeholder="ipfs://CID/metadata.json"
              value={newMetadata}
              onChange={(e) => setNewMetadata(e.target.value)}
            />
            <button onClick={handleAddMetadata}>Add Row</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Metadata Table */}
        {metadata.length > 0 && (
          <div>
            <h4>Metadata Entries:</h4>
            <table className="metadata-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Metadata</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {metadata.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.length > 20 ? `${item.substring(0, 20)}...` : item}
                    </td>
                    <td>
                      <button className="remove-button" onClick={() => handleRemoveMetadata(index)}>
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
