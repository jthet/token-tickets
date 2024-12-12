import transactionStream from './src/services/transactions/getTransactionStream.js';
import getTransactions from './src/services/transactions/getTransactions.js';

// const interval = 1 // Poll every 1 seconds
// transactionStream(interval)

async function fetchTransactions() {
  const tx = await getTransactions({ limit: 1 });
  console.log(tx);
}

fetchTransactions();
