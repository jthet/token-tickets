import { Client } from '@hashgraph/sdk';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

function getClient({
  accountId = null,
  privateKey = null,
  network = 'testnet',
} = {}) {
  if (!accountId && !privateKey) {
    const clientId = defaultAccountId;
    const cliendPrivateKey = defaultPrivateKey;
  } else if ((accountId && !privateKey) || (!accountId && privateKey)) {
    throw new Error('Both accountId and privateKey must be provided together');
  } else {
    const clientId = accountId;
    const cliendPrivateKey = privateKey;
  }

  const client =
    network === 'testnet' ? Client.forTestnet() : Client.forMainnet();
  client.setOperator(clientId, cliendPrivateKey);
  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setDefaultMaxQueryPayment(new Hbar(50));

  return client;
}

export default getClient;
