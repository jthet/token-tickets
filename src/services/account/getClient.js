import { Client } from '@hashgraph/sdk';
import { accountId, privateKey } from '../../config/dotenv.js';

function getClient(network = 'testnet') {
  const client =
    network === 'testnet' ? Client.forTestnet() : Client.forMainnet();
  client.setOperator(accountId, privateKey);
  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setDefaultMaxQueryPayment(new Hbar(50));

  return client;
}

export default getClient;
