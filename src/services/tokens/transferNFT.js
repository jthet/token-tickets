import { TransferTransaction, PrivateKey } from '@hashgraph/sdk';

async function transferNFT({
  client,
  tokenId,
  serialNumber,
  transfererAccountId,
  transfererAccountPrivateKey,
  reciverAccountId,
}) {
  // Transfer NFT from Treasury to new account
  const tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(
      tokenId,
      serialNumber,
      transfererAccountId,
      reciverAccountId
    )
    .freezeWith(client)
    .sign(PrivateKey.fromStringDer(transfererAccountPrivateKey));

  const tokenTransferSubmit = await tokenTransferTx.execute(client);
  const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

  console.log(
    'NFT Transfer from Treasury to new account: ' + tokenTransferRx.status
  );
  return tokenTransferRx;
}

export default transferNFT;
