import React, { useState } from "react";
import {
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} from "@hashgraph/sdk";
import { useSelector } from "react-redux";
import { AppStore } from "../store";
import {
  executeTransaction,
  hc,
} from "../services/wallet/wallet/hashconnect.ts";

const Marketplace = () => {
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">
          Token <span className="highlight">Marketplace</span>
        </h1>
        <p className="about-subtitle">
          Create and manage tokens seamlessly with Hedera's secure network.
        </p>
      </section>

      {/* Token Creation Form */}
      {isConnected && (
        <section className="about-cta">
          <h2>Create a Token</h2>
          <p>Fill out the details to create your own unique token.</p>
          <div style={{ margin: "20px auto", maxWidth: "400px" }}>
            {/* From Account */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                From Account ID:
              </label>
              <select
                className="cta-button"
                style={{ width: "100%", padding: "10px" }}
                value={fromAccountId}
                onChange={(e) => setFromAccountId(e.target.value)}
              >
                <option value="" disabled>
                  Select an Account
                </option>
                {connectedAccountIds.map((accountId) => (
                  <option key={accountId} value={accountId}>
                    {accountId}
                  </option>
                ))}
              </select>
            </div>

            {/* To Account */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                To Account ID:
              </label>
              <input
                className="cta-button"
                type="text"
                placeholder="Enter Account ID"
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            {/* Button */}
            <button
              className="cta-button"
              onClick={async () => {
                try {
                  const supplyKey = PrivateKey.generateED25519();
                  const signer = hc.getSigner(
                    AccountId.fromString(fromAccountId)
                  );

                  const frozenTransaction = await new TokenCreateTransaction()
                    .setTokenName("Test Token")
                    .setTokenSymbol("TEST")
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
              }}
            >
              Create Token
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Marketplace;

// Examples for various transactions, signing, freezing combinations
// {
//   /* <Button
//             variant="contained"
//             color={"blurple" as any}
//             onClick={async () => {
//               const transferTransaction = new TransferTransaction()
//                 .addHbarTransfer(fromAccountId, new Hbar(-1))
//                 .addHbarTransfer(toAccountId, new Hbar(1))
//                 .setNodeAccountIds([AccountId.fromString("0.0.3")])
//                 .setTransactionId(TransactionId.generate(fromAccountId));
//               const frozenTransaction = transferTransaction.freeze();
//               const signResult = await signTransaction(
//                 AccountId.fromString(fromAccountId),
//                 frozenTransaction
//               );
//               console.log({
//                 signResult,
//               });
//             }}
//           >
//             Sign and Return
//           </Button> */
// }
// {
//   /* <Button
//             variant="contained"
//             color={"blurple" as any}
//             onClick={async () => {
//               const signer = hc.getSigner(AccountId.fromString(fromAccountId));
//               const frozenTransaction = await new TransferTransaction()
//                 .addHbarTransfer(fromAccountId, new Hbar(-1))
//                 .addHbarTransfer(toAccountId, new Hbar(1))
//                 .freezeWithSigner(signer);

//               const executeResult = await frozenTransaction.executeWithSigner(
//                 signer
//               );

//               console.log({
//                 executeResult,
//               });
//             }}
//           >
//             Sign and Execute with signer
//           </Button> */
// }
// {
//   /* <Button
//             variant="contained"
//             color={"blurple" as any}
//             onClick={async () => {
//               const transferTransaction = new TransferTransaction()
//                 .addHbarTransfer(fromAccountId, new Hbar(-1))
//                 .addHbarTransfer(toAccountId, new Hbar(1))
//                 .setNodeAccountIds([AccountId.fromString("0.0.3")])
//                 .setTransactionId(TransactionId.generate(fromAccountId));
//               const frozenTransaction = transferTransaction.freeze();
//               const signResult = await signTransaction(
//                 AccountId.fromString(fromAccountId),
//                 frozenTransaction
//               );
//               console.log({
//                 signResult,
//               });
//             }}
//           >
//             Sign and Return
//           </Button> */
// }
