import transactionStream from './src/services/transactions/getTransactionStream.js';
import getTransactions from './src/services/transactions/getTransactions.js';

// Testing transactionStream
// const interval = 1 // Poll every 1 seconds
// transactionStream(interval)

//////////////////////////////////////////////////////////////////////

// testing transactions
// async function fetchTransactions() {
//   const tx = await getTransactions({ limit: 1 });
//   console.log(tx);
// }
// fetchTransactions();

//////////////////////////////////////////////////////////////////////
// // testing createNFT
// import createNFT from './src/services/tokens/createNFT.js';
// import getClient from './src/services/account/getClient.js';

// async function main() {
//   const { tokenId, supplyKey } = await createNFT({
//     client: getClient(),
//     tokenName: 'My NFT',
//     tokenSymbol: 'MNFT',
//   });

//   console.log('Token ID: ' + tokenId);
//   console.log('Supply Key: ' + supplyKey);
// }

// main();

//////////////////////////////////////////////////////////////////////

// testing getBalance
import getBalance from './src/services/account/getBalance.js';
import getClient from './src/services/account/getClient.js';


async function main() {
  const accountId1 = '0.0.111111';
  const privateKey1 =
    '302e02010030050fffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  const client = getClient({ accountId: accountId1, privateKey: privateKey1 });
  await getBalance({ client: getClient() });
  client.close();
}

main();

//////////////////////////////////////////////////////////////////////

// // testing veryifyAccount
// import { verifyAccountIdAndPrivateKey } from './src/services/account/verifyAccount.js';
// import { defaultAccountId, defaultPrivateKey } from './src/config/dotenv.js';
// import getClient from './src/services/account/getClient.js';

// async function main() {
//   const client = getClient();
//   const valid = await verifyAccountIdAndPrivateKey({
//     client: client,
//     accountId: '0.0.5223403',
//     privateKeyString:
//       '302e020100300506032b6570042204208fcb7342c3d965c8d76bab83f27695fb8160ff5176be8bb25221d776df4d46aa',
//   });
//   console.log(valid);
//   client.close();
// }

// main();
