import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenAssociateTransaction,
  TokenMintTransaction,
} from '@hashgraph/sdk';

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

// import verifyAccount from './src/services/account/verifyAccount.js';
// import { defaultAccountId, defaultPrivateKey } from './src/config/dotenv.js';
// import getClient from './src/services/account/getClient.js';

// // console.log(defaultAccountId);
// // console.log(defaultPrivateKey);

// async function main() {
//   const client = getClient();
//   await verifyAccount(client, defaultAccountId, defaultPrivateKey);
//   client.close();
// }

// main();

//////////////////////////////////////////////////////////////////////
////////// FULL STACK NFT CREATE, MINT, ASSOCIATE, TRANSFER //////////
//////////////////////////////////////////////////////////////////////

import getClient from './src/services/account/getClient.js';
import mintNFT from './src/services/tokens/mintNFT.js';
import createNFT from './src/services/tokens/createNFT.js';
import associateToken from './src/services/tokens/associateToken.js';
import { getBalanceNFT } from './src/services/account/getBalance.js';
import { defaultAccountId, defaultPrivateKey } from './src/config/dotenv.js';
import transferNFT from './src/services/tokens/transferNFT.js';

async function fullNFTLifecycle() {
  const CID = [
    Buffer.from(
      'ipfs://bafyreiao6ajgsfji6qsgbqwdtjdu5gmul7tv2v3pd6kjgcw5o65b2ogst4/metadata.json'
    ),
    Buffer.from(
      'ipfs://bafyreic463uarchq4mlufp7pvfkfut7zeqsqmn3b2x3jjxwcjqx6b5pk7q/metadata.json'
    ),
    Buffer.from(
      'ipfs://bafyreihhja55q6h2rijscl3gra7a3ntiroyglz45z5wlyxdzs6kjh2dinu/metadata.json'
    ),
    Buffer.from(
      'ipfs://bafyreidb23oehkttjbff3gdi4vz7mjijcxjyxadwg32pngod4huozcwphu/metadata.json'
    ),
    Buffer.from(
      'ipfs://bafyreie7ftl6erd5etz5gscfwfiwjmht3b52cevdrf7hjwxx5ddns7zneu/metadata.json'
    ),
  ];

  const client = getClient();
  const { tokenId, supplyKey } = await createNFT({
    client: getClient(),
    tokenName: 'TestNetCoin',
    tokenSymbol: 'TNC',
  });

  // console.log('Token ID: ' + tokenId);
  // console.log('Supply Key: ' + supplyKey);

  const mintReceipt = await mintNFT({
    client,
    tokenId,
    supplyKey,
    CID,
  });

  console.log(' - Token Mint Recepit: ' + mintReceipt);

  console.log(
    ' - Created NFT ' + tokenId + ' with serial number: ' + mintReceipt.serials
  );

  ////// associating token

  // Make a new account to transfer to:
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;
  // creating new account with 1000 tinybars
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  console.log(' - New account ID is: ' + newAccountId);

  const associateAccountRx = await associateToken(
    client,
    tokenId,
    newAccountId,
    newAccountPrivateKey
  );

  console.log(
    ` - NFT association with New account: ${associateAccountRx.status}\n`
  );

  console.log('- Association Receipt: ' + associateAccountRx);

  // query balance of NFT
  const tokenBalance = await getBalanceNFT(client, defaultAccountId, tokenId);
  console.log(
    ` - My Account Balance: ${tokenBalance} units of token ID ${tokenId}`
  );

  // implement transfer
  const transferReceipt = await transferNFT({
    client,
    tokenId,
    serialNumber: 1,
    transfererAccountId: defaultAccountId,
    transfererAccountPrivateKey: defaultPrivateKey,
    reciverAccountId: newAccountId,
  });

  console.log(
    ' - NFT Transfer from Treasury to new account: ' + transferReceipt
  );

  client.close();
}

fullNFTLifecycle();

//////////////////////////////////////////////////////////////////////
////////////////////////// CREATE NEW ACCOUNT ////////////////////////


// import createAccount from './src/services/account/createAccount.js';
// import getClient from './src/services/account/getClient.js';

// async function getNewAccount() {
//   const client = getClient();
//   const { receipt, newAccountPublicKey, newAccountPrivateKey } = await createAccount(client);

//   // console.log(receipt);
//   console.log('New Account Id: ' + receipt.accountId);
//   console.log('New Account Public Key: ', newAccountPublicKey.toStringDer());
//   console.log('New Account Private Key: ', newAccountPrivateKey.toStringDer());
//   client.close();
// }

// getNewAccount();
