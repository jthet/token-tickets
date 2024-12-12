import { getBalance } from './src/services/account/getBalance.js'
import transactionStream from './src/services/transactions/getTransactionStream.js'

/**
 * Main function to start the application.
 * @returns {Promise<void>} A promise that resolves when the application has started.
 */
async function main() {
  try {
    await getBalance()

    const interval = 1 // Poll every 5 seconds
    const verbose_level = 1 // verbosity level. See logger for more details
    transactionStream(interval, verbose_level)
  } catch (error) {
    console.error('Error starting the application:', error)
  }
}

main()
