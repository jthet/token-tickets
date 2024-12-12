import { createLogger, format, transports } from 'winston'
import path from 'path'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join('logs', 'transaction-combined.log'),
    }),
  ],
})

function logTransaction(transaction, verbose) {
  if (verbose === null) {
    // Verbose is null, returning without logging
    return
  }

  let logMessage = ''

  if (verbose === 0) {
    logMessage = `Transaction ID: ${transaction.transaction_id}`
  } else if (verbose === 1) {
    const logObject = {
      'Transaction ID': transaction.transaction_id,
      Timestamp: transaction.consensus_timestamp,
      Type: transaction.name,
      Status: transaction.result,
      Fee: transaction.charged_tx_fee,
    }
    logMessage = '\n' + JSON.stringify(logObject, null, 2)
  } else if (verbose === 2) {
    const logObject = {
      'Transaction ID': transaction.transaction_id,
      Timestamp: transaction.consensus_timestamp,
      Type: transaction.name,
      Status: transaction.result,
      Fee: transaction.charged_tx_fee,
      Transfers: transaction.transfers,
      'Token Transfers': transaction.token_transfers,
      'NFT Transfers': transaction.nft_transfers,
      'Staking Reward Transfers': transaction.staking_reward_transfers,
    }
    logMessage = JSON.stringify(logObject, null, 2)
  } else if (verbose === 3) {
    logMessage = JSON.stringify(transaction, null, 2) + '\n\n'
  } else {
    console.log('Invalid verbose level')
    return
  }
  logger.info(logMessage)
}

export { logTransaction }
