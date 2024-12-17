import React, { useState } from "react";
import TokenFormCard from "../components/CreateTokenFormCard.tsx"; // Modular Create Token Form
import "../styles/Marketplace.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Marketplace = () => {
  const navigate = useNavigate();

  const [showCreateToken, setShowCreateToken] = useState(false);
  const [showMintTokens, setShowMintTokens] = useState(false);
  const [showViewTokens, setShowViewTokens] = useState(false);

  const openCreateToken = () => {
    setShowCreateToken(true);
    setShowMintTokens(false);
    setShowViewTokens(false);
  };

  const openMintTokens = () => {
    setShowMintTokens(true);
    setShowCreateToken(false);
    setShowViewTokens(false);
  };

  const openViewTokens = () => {
    setShowViewTokens(true);
    setShowCreateToken(false);
    setShowMintTokens(false);
  };

  const goToOrganizersPage = () => {
    console.log("Navigating to /organizers"); // Debug log
    navigate("/organizers");
  };

  return (
    <div className="marketplace-container">
      {/* Hero Section */}
      <section className="marketplace-hero">
        <h1 className="marketplace-title">
          Token <span className="highlight">Marketplace</span>
        </h1>
        <p className="marketplace-subtitle">
          Manage your tokens effortlessly with a modern, secure platform.
        </p>
        {/* Event organizer button link*/}
        <Button
          label="Organizer?"
          variant="outline"
          onClick={goToOrganizersPage} // Navigate to About page
        />
      </section>

      {/* Feature Options */}
      <section className="marketplace-options">
        <div className="marketplace-option" onClick={openMintTokens}>
          <h3>View Your Tickets</h3>
          <p>Mint additional tickets for your existing events</p>
        </div>

        <div className="marketplace-option" onClick={openViewTokens}>
          <h3>View Events</h3>
          <p>Explore and manage the events in your account.</p>
        </div>
      </section>
      {showMintTokens && (
        <div className="placeholder-card">
          <h2>Your Tickets</h2>
          <p>This is a placeholder for Your Tickets. Coming soon!</p>
          <button
            className="close-button"
            onClick={() => setShowMintTokens(false)}
          >
            Close
          </button>
        </div>
      )}
      {showViewTokens && (
        <div className="placeholder-card">
          <h2>View Events</h2>
          <p>This is a placeholder for viewing tokens. Coming soon!</p>
          <button
            className="close-button"
            onClick={() => setShowViewTokens(false)}
          >
            Close
          </button>
        </div>
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
