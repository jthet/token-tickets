import start from './src/services/transactions/getTransactionStream.js'

const interval = 1 // Poll every 1 seconds
start(interval)
