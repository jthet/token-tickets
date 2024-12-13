import { TokenMintTransaction, Hbar } from '@hashgraph/sdk';

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

async function mintNFT({
  client,
  tokenId,
  supplyKey,
  maxTransactionFee = new Hbar(20),
  CID,
} = {}) {
  // verifying CID structure
  if (!Array.isArray(CID) || !CID.every((item) => Buffer.isBuffer(item))) {
    throw new Error('CID must be an array of Buffer objects');
  }

  const mintTx = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata(CID) // Batch minting - UP TO 10 NFTs in single tx
    .setMaxTransactionFee(maxTransactionFee)
    .freezeWith(client); // Freeze the transaction

  // sign with supply key and execute with client
  const mintTxSign = await mintTx.sign(supplyKey);
  const mintTxSubmit = await mintTxSign.execute(client);

  // tx receipt
  const mintRx = await mintTxSubmit.getReceipt(client);

  return mintRx;
}

export default mintNFT;

// export default mintNFT;

// //IPFS content identifiers for which we will create a NFT

// // MINT NEW BATCH OF NFTs
// const mintTx = new TokenMintTransaction()
//   .setTokenId(tokenId)
//   .setMetadata(CID) //Batch minting - UP TO 10 NFTs in single tx
//   .setMaxTransactionFee(maxTransactionFee)
//   .freezeWith(client);

// //Sign the transaction with the supply key
// const mintTxSign = await mintTx.sign(supplyKey);

// //Submit the transaction to a Hedera network
// const mintTxSubmit = await mintTxSign.execute(client);

// //Get the transaction receipt
// const mintRx = await mintTxSubmit.getReceipt(client);

// //Log the serial number
// console.log(
//   'Created NFT ' + tokenId + ' with serial number: ' + mintRx.serials
// );
