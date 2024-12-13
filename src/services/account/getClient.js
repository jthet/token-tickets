import { Client, Hbar, PrivateKey, AccountId } from '@hashgraph/sdk';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

function getClient({
  accountId = defaultAccountId,
  privateKey = defaultPrivateKey,
  network = 'testnet',
} = {}) {
  const client =
    network === 'mainnet' ? Client.forMainnet() : Client.forTestnet();
  try {
    // Validate accountId and privateKey
    const accountIdObj = AccountId.fromString(accountId);
    const privateKeyObj = PrivateKey.fromStringDer(privateKey);

    client.setOperator(accountIdObj, privateKeyObj);
  } catch (error) {
    // console.error('Failed to set operator:', error);
    client.close();
    throw new Error('Failed to set operator');
  }

  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setDefaultMaxQueryPayment(new Hbar(50));

  return client;
}

export default getClient;
