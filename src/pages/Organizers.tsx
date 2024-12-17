import React, { useState } from "react";
import CreateTokenFormCard from "../components/CreateTokenFormCard.tsx"; // Modular Create Token Form
import "../styles/Organizers.css";
import MintTokenCard from "../components/MintTokenCard.tsx";
import ViewEventsCard from "../components/ViewEventsCard.tsx";

const Organizers = () => {
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

  return (
    <div className="marketplace-container">
      {/* Hero Section */}
      <section className="marketplace-hero">
        <h1 className="marketplace-title">
          Event <span className="highlight">Organizers</span>
        </h1>
        <p className="marketplace-subtitle">
          Create, mint, and manage event tokens with ease.
        </p>
      </section>

      {/* Feature Options */}
      <section className="marketplace-options">
        <div className="marketplace-option" onClick={openCreateToken}>
          <h3>Create Event Tokens</h3>
          <p>Create a unique NFT ticke collection for your upcoming event</p>
        </div>

        <div className="marketplace-option" onClick={openMintTokens}>
          <h3>Mint Event Tickets</h3>
          <p>Mint additional tickets for your existing events</p>
        </div>

        <div className="marketplace-option" onClick={openViewTokens}>
          <h3>View Events</h3>
          <p>Explore and manage the events in your account.</p>
        </div>
      </section>

      {/* Dynamic Pop-Up Cards */}
      {showCreateToken && (
        <CreateTokenFormCard
          onClose={() => setShowCreateToken(false)}
          connectedAccountIds={[]}
        /> // Recently added "connectedAccountIds" prop, might break
      )}
      {showMintTokens && (
        <div className="placeholder-card">
          <MintTokenCard onClose={() => setShowMintTokens(false)} />
        </div>
      )}
      {showViewTokens && (
        <div className="placeholder-card">
          <ViewEventsCard />
        </div>
      )}
    </div>
  );
};

export default Organizers;

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
