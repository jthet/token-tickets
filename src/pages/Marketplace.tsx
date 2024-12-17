import React, { useState } from "react";
import "../styles/Marketplace.css";

const Marketplace: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"allEvents" | "myTickets">(
    "allEvents"
  );

  // Dummy content for illustration
  const renderContent = () => {
    if (selectedTab === "allEvents") {
      return <div className="tab-content">Here are all the events...</div>;
    } else {
      return <div className="tab-content">Here are your tickets...</div>;
    }
  };

  return (
    <div className="marketplace-container">
      {/* Hero Section */}
      <section className="marketplace-hero">
        <h1 className="marketplace-title">
          Token <span className="highlight">Marketplace</span>
        </h1>
        <p className="marketplace-subtitle">
          Browse events and manage your tickets seamlessly.
        </p>
      </section>

      {/* Tab Options */}
      <div className="tab-container">
        <span
          className={`tab-option ${selectedTab === "allEvents" ? "active" : ""}`}
          onClick={() => setSelectedTab("allEvents")}
        >
          All Events
        </span>
        <span
          className={`tab-option ${selectedTab === "myTickets" ? "active" : ""}`}
          onClick={() => setSelectedTab("myTickets")}
        >
          My Tickets
        </span>
      </div>

      {/* Dynamic Content */}
      <div className="content-container">{renderContent()}</div>
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
