import getClient from '../account/getClient.js';
import { defaultAccountId, defaultPrivateKey } from '../../config/dotenv.js';

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
} from '@hashgraph/sdk';

// Note to go back to: right now the treasuryAccount and Client are the same
async function createNFT({
  tokenName, // Required
  tokenSymbol, // Required
  maxSupply = 250,
  supplyType = TokenSupplyType.Finite,
  treasuryAccountId = defaultAccountId, // if not here we will use the getClient operator default
  treasurePrivateKey = defaultPrivateKey, // if not here we will use the getClient operator default
  clientId = defaultAccountId,
  clientPrivateKey = defaultPrivateKey,
} = {}) {
  if (!tokenName || !tokenSymbol) {
    throw new Error('Both tokenName and tokenSymbol are required');
  }

  // verify accounts


  // create client. same as treasury account
  const client = getClient(clientId, clientPrivateKey);

  const supplyKey = PrivateKey.generateED25519();

  const nftCreate = await new TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(treasuryAccountId)
    .setSupplyType(supplyType)
    .setMaxSupply(maxSupply)
    .setSupplyKey(supplyKey)
    .freezeWith(client);

  //Sign the transaction with the treasury key
  const nftCreateTxSign = await nftCreate.sign(
    PrivateKey.fromStringDer(treasurePrivateKey)
  );

  // submitting nft, getting receipt with tokenId
  const nftCreateSubmit = await nftCreateTxSign.execute(client);
  const nftCreateRx = await nftCreateSubmit.getReceipt(client);
  const tokenId = nftCreateRx.tokenId;


  console.log('Real Supply Key: ' + supplyKey);
  console.log('Real Created NFT with Token ID: ' + tokenId);

  client.close();

  return { tokenId, supplyKey };
}

export default createNFT;
