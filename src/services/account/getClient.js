import { Client, Hbar } from '@hashgraph/sdk';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

function getClient({
  accountId = defaultAccountId,
  privateKey = defaultPrivateKey,
  network = 'testnet',
} = {}) {
  if ((accountId && !privateKey) || (!accountId && privateKey)) {
    throw new Error('Both accountId and privateKey must be provided together');
  }

  const client =
    network === 'testnet' ? Client.forTestnet() : Client.forMainnet();
  client.setOperator(accountId, privateKey);
  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setDefaultMaxQueryPayment(new Hbar(50));

  console.log('Client created with operator:', accountId);
  return client;
}

export default getClient;
