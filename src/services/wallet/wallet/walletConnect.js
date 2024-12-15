import { HashConnect } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';

async function walletConnect() {
  console.log('Connecting wallet...');

  let saveData = {
    topic: '',
    pairingString: '',
    privateKey: '',
    pairedWalletData: null,
    pairedAccounts: [],
  };
  let appMetadata = {
    name: 'Ticket Tokens',
    description: 'Event Ticket Marketplace on Hedera',
    icons: [
      'https://raw.githubusercontent.com/ed-marquez/hedera-dapp-days/testing/src/assets/hederaLogo.png',
    ],
    url: 'https://your-dapp-url.com',
  };

  // create HashConnect instance
  const hashconnectProjectId = process.env.REACT_APP_HASHCONNECT_PROJECT_ID;
  const projectId = hashconnectProjectId;
  const hashconnect = new HashConnect(
    LedgerId.TESTNET,
    projectId,
    appMetadata,
    true
  );

  console.log('Initializing HashConnect...');
  try {
    // register events
    hashconnect.pairingEvent.on((newPairing) => {
      console.log('Pairing event triggered:', newPairing);
      saveData.pairedAccounts = newPairing.accountIds;
      saveData.pairedWalletData = newPairing.metadata;
    });

    hashconnect.disconnectionEvent.on(() => {
      console.log('Disconnected from wallet.');
    });

    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      console.log('Connection status changed:', connectionStatus);
    });

    // init HashConnect
    await hashconnect.init();
    console.log('- HashConnect initialized successfully.');

    // open pairing modal
    hashconnect.openPairingModal();

    // Generate pairing string (optional if using modal)
    const pairingString = hashconnect.generatePairingString({
      network: 'testnet',
    });
    console.log('- Pairing string:', pairingString);
  } catch (error) {
    console.error('Error during wallet connection:', error.message);
    throw error;
  }

  return hashconnect;
}

export default walletConnect;
