import getClient from '../account/getClient.js';
import { AccountBalanceQuery } from '@hashgraph/sdk';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

export async function getBalance({
  client,
  accountId = defaultAccountId,
} = {}) {
  if (!accountId || !client) {
    throw new Error(
      'Both accountId and client are required to get the account balance'
    );
  }

  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId) // Use the imported accountId directly
    .execute(client);
  // console.log(`Your account balance is: ${balance.hbars.toString()}`);

  client.close();
  return balance;
}

export async function getBalanceNFT(client, accountId, tokenId) {
  var balanceCheckTx = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);
  return balanceCheckTx.tokens._map.get(tokenId.toString());
}

export default getBalance;
