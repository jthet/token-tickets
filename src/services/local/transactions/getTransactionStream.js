import getTransactions from './getTransactions.js';

async function getTransactionStream(interval, verbose_level) {
  let lastTimestamp = null;
  // let processedTransactionIds = new Set();
  // const MAX_PROCESSED_IDS = 10000 // max processed IDs we cache

  async function poll() {
    const transactions = await getTransactions({
      lastTimestamp: lastTimestamp,
      testNet: true,
      transactionType: 'cryptoTransfer', // default
      result: 'success', // default
      verbose_level: verbose_level, // default
    });

    // Update the lastTimestamp to the timestamp of the last transaction
    if (transactions.length > 0) {
      lastTimestamp = transactions[transactions.length - 1].consensus_timestamp;
    }

    // console.log('\nLast Timestamp ' + lastTimestamp + '\n')
  }

  poll(); // Initial call to fetch transactions immediately
  setInterval(poll, interval);
}

/**
 * Starts the transaction stream polling.
 * @param {number} interval - The polling interval in seconds.
 */
async function transactionStream(interval, verbose_level) {
  getTransactionStream(interval * 1000, verbose_level); // Poll every interval seconds
}

export default transactionStream;
