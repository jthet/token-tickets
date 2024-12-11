import { getClient } from './getClient.js'
import { AccountBalanceQuery } from '@hashgraph/sdk'
import { accountId, privateKey } from '../../config/dotenv.js'

export async function getBalance() {
  if (!accountId || !privateKey) {
    throw new Error(
      'Environment variables ACCOUNT_ID and PRIVATE_KEY must be present'
    )
  }

  const network = 'testnet'
  const client = getClient(network)

  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId) // Use the imported accountId directly
    .execute(client)
  console.log(`Your account balance is: ${balance.hbars.toString()}`)

  return balance
}

export default getBalance
