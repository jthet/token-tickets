import { HashConnect } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";

async function walletConnectFcn() {
  console.log("\n=======================================");
  console.log("- Connecting wallet...");

  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: [],
  };
  let appMetadata = {
    name: "Hedera dApp Days",
    description: "Let's buidl a dapp on Hedera",
    icons: [
      "https://raw.githubusercontent.com/ed-marquez/hedera-dapp-days/testing/src/assets/hederaLogo.png",
    ],
    url: "https://your-dapp-url.com", // Replace with your actual DApp URL
  };

  // Create HashConnect instance
  const projectId = "d96d9894e9b8da5745a27cbd68e761c1"; // Replace with your project ID
  const hashconnect = new HashConnect(
    LedgerId.TESTNET,
    projectId,
    appMetadata,
    true
  );

  console.log("Initializing HashConnect...");
  try {
    // Register events
    hashconnect.pairingEvent.on((newPairing) => {
      console.log("Pairing event triggered:", newPairing);
      saveData.pairedAccounts = newPairing.accountIds;
      saveData.pairedWalletData = newPairing.metadata;
    });

    hashconnect.disconnectionEvent.on(() => {
      console.log("Disconnected from wallet.");
    });

    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      console.log("Connection status changed:", connectionStatus);
    });

    // Initialize HashConnect
    await hashconnect.init();
    console.log("- HashConnect initialized successfully.");

    // Open pairing modal
    hashconnect.openPairingModal();

    // Generate pairing string (optional if using modal)
    const pairingString = hashconnect.generatePairingString({
      network: "testnet",
    });
    console.log("- Pairing string:", pairingString);
  } catch (error) {
    console.error("Error during wallet connection:", error.message);
    throw error;
  }

  return hashconnect;
}

export default walletConnectFcn;
