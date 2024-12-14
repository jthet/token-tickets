import { TokenAssociateTransaction } from '@hashgraph/sdk';

async function associateToken(
  client,
  tokenId,
  newAccountId,
  newAccountPrivateKey
) {
  // Associate the NFT with an account
  const associateAccountTx = await new TokenAssociateTransaction()
    .setAccountId(newAccountId)
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(newAccountPrivateKey);

  // submit txn and get receipt
  const associateAccountTxSubmit = await associateAccountTx.execute(client);
  const associateAccountRx = await associateAccountTxSubmit.getReceipt(client);

  return associateAccountRx;
}

export default associateToken;
