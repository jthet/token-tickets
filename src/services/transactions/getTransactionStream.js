import getTransactions from './getTransactions.js'

async function getTransactionStream(interval, verbose_level) {
  let lastTimestamp = null
  let processedTransactionIds = new Set()

  async function poll() {
    const currentBatchIds = new Set()

    const transactions = await getTransactions({
      lastTimestamp: lastTimestamp,
      processedTransactionIds: processedTransactionIds,
      testNet: true,
      transactionType: 'cryptoTransfer', // default
      result: 'success', // default
      verbose_level: verbose_level, // default
    })
    lastTimestamp = transactions.lastTimestamp

    // This is important because the "new transactions" are rewritten every poll
    transactions.newTransactions.forEach((transaction) => {
      currentBatchIds.add(transaction.transaction_id)
    })

    processedTransactionIds = currentBatchIds
    // Process new transactions
    // transactions.newTransactions.forEach((transaction) => {
    //   // Handle new transactions
    // });
  }

  poll() // Initial call to fetch transactions immediately
  setInterval(poll, interval)
}

/**
 * Starts the transaction stream polling.
 * @param {number} interval - The polling interval in seconds.
 */
async function transactionStream(interval, verbose_level) {
  getTransactionStream(interval * 1000, verbose_level) // Poll every 10 seconds
}

export { transactionStream }
