// import transactionStream from './src/services/transactions/getTransactionStream.js';
// import getTransactions from './src/services/transactions/getTransactions.js';
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

// // testing getBalance
// import getBalance from './src/services/account/getBalance.js';
// import getClient from './src/services/account/getClient.js';

// async function main() {
//   const accountId1 = '0.0.111111';
//   const privateKey1 =
//     '302e02010030050fffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
//   const client = getClient({ accountId: accountId1, privateKey: privateKey1 });
//   await getBalance({ client: getClient() });
//   client.close();
// }

// main();

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

//////////////////////////////////////////////////////////////////////

// Minting NFT

// import getClient from './src/services/account/getClient.js';
// import mintNFT from './src/services/tokens/mintNFT.js';
// import createNFT from './src/services/tokens/createNFT.js';

// async function main() {
//   const CID = [
//     Buffer.from(
//       'ipfs://bafyreiao6ajgsfji6qsgbqwdtjdu5gmul7tv2v3pd6kjgcw5o65b2ogst4/metadata.json'
//     ),
//     Buffer.from(
//       'ipfs://bafyreic463uarchq4mlufp7pvfkfut7zeqsqmn3b2x3jjxwcjqx6b5pk7q/metadata.json'
//     ),
//     Buffer.from(
//       'ipfs://bafyreihhja55q6h2rijscl3gra7a3ntiroyglz45z5wlyxdzs6kjh2dinu/metadata.json'
//     ),
//     Buffer.from(
//       'ipfs://bafyreidb23oehkttjbff3gdi4vz7mjijcxjyxadwg32pngod4huozcwphu/metadata.json'
//     ),
//     Buffer.from(
//       'ipfs://bafyreie7ftl6erd5etz5gscfwfiwjmht3b52cevdrf7hjwxx5ddns7zneu/metadata.json'
//     ),
//   ];

//   const client = getClient();
//   const { tokenId, supplyKey } = await createNFT({
//     client: getClient(),
//     tokenName: 'My NFT',
//     tokenSymbol: 'MNFT',
//   });

//   // console.log('Token ID: ' + tokenId);
//   // console.log('Supply Key: ' + supplyKey);

//   const mintReceipt = await mintNFT({
//     client,
//     tokenId,
//     supplyKey,
//     CID,
//   });

//   console.log('Mint Recepit: ' + mintReceipt);

//   console.log(
//     'Created NFT ' + tokenId + ' with serial number: ' + mintReceipt.serials
//   );

//   client.close();
// }

// main();

//////////////////////////////////////////////////////////////////////

import verifyAccount from './src/services/account/verifyAccount.js';
import { defaultAccountId, defaultPrivateKey } from './src/config/dotenv.js';
import getClient from './src/services/account/getClient.js';

// console.log(defaultAccountId);
// console.log(defaultPrivateKey);

async function main() {
  const client = getClient();
  await verifyAccount(client, defaultAccountId, defaultPrivateKey);
  client.close();
}

main();
