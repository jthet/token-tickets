import { Client } from '@hashgraph/sdk';
import { accountId, privateKey } from '../../config/dotenv.js';

function getClient(network = 'testnet') {
  const client =
    network === 'testnet' ? Client.forTestnet() : Client.forMainnet();
  client.setOperator(accountId, privateKey);
  return client;
}

export default getClient;
