const { Client, Hbar, PrivateKey, AccountId } = require('@hashgraph/sdk');
const { defaultAccountId, defaultPrivateKey } = require('../config/dotenv.js');

function getClient({
  accountId = defaultAccountId,
  privateKey = defaultPrivateKey,
  network = 'testnet',
} = {}) {
  const client =
    network === 'mainnet' ? Client.forMainnet() : Client.forTestnet();

  console.log('defaultAccountId:', accountId);
  console.log('defaultPrivateKey:', privateKey);

  try {
    // Validate accountId and privateKey
    const accountIdObj = AccountId.fromString(accountId);
    const privateKeyObj = PrivateKey.fromString(privateKey);

    client.setOperator(accountIdObj, privateKeyObj);
    console.log('Operator successfully set.');
  } catch (error) {
    console.error('Failed to set operator:', error.message);
    client.close();
    throw new Error('Failed to set operator');
  }

  // // Set default configurations
  // client.setDefault({
  //   maxTransactionFee: new Hbar(100), // Set default max transaction fee
  //   maxQueryPayment: new Hbar(50), // Set default max query payment
  // });

  return client;
}

// Run the function for testing
try {
  getClient();
} catch (err) {
  console.error(err.message);
}

module.exports = getClient;
