import { TokenAssociateTransaction } from '@hashgraph/sdk';

async function associateToken(
  client,
  tokenId,
  newAccountId,
  newAccountPrivateKey
) {
  // Associate the NFT with the new account

  console.log('Associating NFT with new account...');
  console.log('New Account ID: ' + newAccountId);
  console.log('New Account Private Key: ' + newAccountPrivateKey);

  const associateAccountTx = await new TokenAssociateTransaction()
    .setAccountId(newAccountId)
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(newAccountPrivateKey);

  // submit txn and get receipt
  const associateAccountTxSubmit = await associateAccountTx.execute(client);
  const associateAccountRx = await associateAccountTxSubmit.getReceipt(client);

  console.log(
    `NFT association with New account: ${associateAccountRx.status}\n`
  );
  return associateAccountRx;
}

export default associateToken;
// const associateAccountTx = await new TokenAssociateTransaction()
//   .setAccountId(newAccountId)
//   .setTokenIds([tokenId])
//   .freezeWith(client)
//   .sign(newAccountPrivateKey);

// //Submit the transaction to a Hedera network
// const associateAccountTxSubmit = await associateAccountTx.execute(client);

// //Get the transaction receipt
// const associateAccountRx = await associateAccountTxSubmit.getReceipt(client);

// //Confirm the transaction was successful
// console.log(`NFT association with New account: ${associateAccountRx.status}\n`);
