import axios from 'axios';
import { logTransaction } from '../../../utils/transactions/logger.js';

// Function to fetch transactions from the Hedera mirror node
async function getTransactions({
  lastTimestamp = null,
  testNet = true,
  transactionType = 'cryptoTransfer',
  result = 'success',
  verbose_level = null, // default, returns all json data
  limit = 100, // default, returns up to 100 transactions
} = {}) {
  // if lastTimestamp is not given, set it to 10 seconds before the current time
  if (!lastTimestamp) {
    const now = Date.now();
    const seconds = Math.floor(now / 1000);
    const nanoseconds = (now % 1000) * 1e6;
    const lag = 10; // 10 seconds lag
    lastTimestamp = `${seconds - lag}.${nanoseconds.toString().padStart(9, '0')}`;
  }

  const nodeUrl = testNet
    ? 'https://testnet.mirrornode.hedera.com/api/v1/transactions'
    : 'https://mainnet.mirrornode.hedera.com/api/v1/transactions';

  const queryParams = new URLSearchParams({
    result,
    transactiontype: transactionType,
    order: 'asc', // keep this constant.
    limit,
  });

  if (lastTimestamp) {
    queryParams.append('timestamp', `gt:${lastTimestamp}`);
  }

  try {
    const response = await axios.get(nodeUrl, { params: queryParams });
    // console.log('Response data:', response.data) // Log the response data

    if (response.data.transactions) {
      response.data.transactions.forEach((transaction) => {
        logTransaction(transaction, verbose_level);
      });
      return response.data.transactions;
    } else {
      console.error('No transactions found in response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export default getTransactions;
