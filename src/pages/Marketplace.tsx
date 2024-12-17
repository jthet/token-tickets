import React, { useState, useEffect } from "react";
import "../styles/Marketplace.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { fetchUniqueEvents, EventData } from "../services/api/eventsService.ts";

// Modular components
import AllEvents from "../components/AllEvents.tsx";
import UserTickets from "../components/UserTickets.tsx";

const Marketplace: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"allEvents" | "myTickets">(
    "allEvents"
  );
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch Unique Events
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchUniqueEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when "All Events" tab is selected
  useEffect(() => {
    if (selectedTab === "allEvents") {
      loadEvents();
    }
  }, [selectedTab]);

  const goToOrganizers = () => {
    navigate("/organizers");
  };

  // Dynamic content rendering
  const renderContent = () => {
    switch (selectedTab) {
      case "allEvents":
        return <AllEvents events={events} loading={loading} error={error} />;
      case "myTickets":
        return <UserTickets />;
      default:
        return null;
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
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            label="Event Organizer?"
            variant="outline"
            onClick={goToOrganizers}
          />
        </div>
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
