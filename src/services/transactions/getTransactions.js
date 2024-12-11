import axios from 'axios'
import { logTransaction } from '../../utils/transactions/logger.js'

// Function to fetch transactions from the Hedera mirror node
async function getTransactions({
  lastTimestamp = null,
  processedTransactionIds = new Set(),
  testNet = true,
  transactionType = 'cryptoTransfer',
  result = 'success',
  verbose_level = null, // default, returns all json data
} = {}) {
  const nodeUrl = testNet
    ? 'https://testnet.mirrornode.hedera.com/api/v1/transactions'
    : 'https://mainnet.mirrornode.hedera.com/api/v1/transactions'

  const queryParams = {
    result: result,
    transactiontype: transactionType,
    // limit: 2,
    // "account.id": "0.0.3",
  }

  if (lastTimestamp) {
    queryParams.timestamp = `gt:${lastTimestamp}`
  }

  const newTransactions = []

  try {
    const response = await axios.get(nodeUrl, { params: queryParams })
    const transactions = response.data.transactions

    if (transactions.length > 0) {
      transactions.forEach((transaction) => {
        if (!processedTransactionIds.has(transaction.transaction_id)) {
          logTransaction(transaction, verbose_level)
          // Add the transaction ID to the set of processed IDs
          // processedTransactionIds.add(transaction.transaction_id);
          newTransactions.push(transaction)
        }
      })

      // Update the lastTimestamp to the timestamp of the last transaction
      lastTimestamp = transactions[transactions.length - 1].consensus_timestamp
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
  }

  return { lastTimestamp, newTransactions }
}

export default getTransactions
