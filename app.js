import { getBalance } from "./src/services/account/getBalance.js";
import { transactionStream } from "./src/services/transactions/getTransactionStream.js";

/**
 * Main function to start the application.
 */
async function main() {
  try {
    await getBalance();

    const interval = 1; // Poll every 5 seconds
    const verbose_level = 0; // Verbose level 1
    transactionStream(interval, verbose_level);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}

// Start the application
main();