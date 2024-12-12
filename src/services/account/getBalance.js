import getClient from '../account/getClient.js';
import { AccountBalanceQuery } from '@hashgraph/sdk';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

export async function getBalance({
  accountId = defaultAccountId,
  privateKey = defaultPrivateKey,
} = {}) {
  if (!accountId || !privateKey) {
    throw new Error(
      'Environment variables ACCOUNT_ID and PRIVATE_KEY must be present'
    );
  }

  const network = 'testnet';
  const client = getClient(accountId, privateKey, network);

  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId) // Use the imported accountId directly
    .execute(client);
  console.log(`Your account balance is: ${balance.hbars.toString()}`);

  client.close();
  return balance;
}

export default getBalance;
