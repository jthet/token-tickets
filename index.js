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
// testing createNFT
// import createNFT from './src/services/tokens/createNFT.js';

// async function main() {
//   const { tokenId, supplyKey } = await createNFT({
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

async function main() {
  await getBalance();
}

main();
