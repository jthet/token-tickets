import createNFT from "../services/local/tokens/createNFT";
import getClient from "../services/local/account/getClient";
import {
  Client,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} from '@hashgraph/sdk';

describe('createNFT', () => {
  test('returns are defined simple test', async () => {
    const client = getClient();
    const { tokenId, supplyKey } = await createNFT({
      client: client,
      tokenName: 'My NFT',
      tokenSymbol: 'MNFT',
    });
    expect(tokenId).toBeDefined();
    expect(supplyKey).toBeDefined();
    client.close();
  });

  test('should throw an error if tokenName or tokenSymbol is missing', async () => {
    const client = getClient();
    await expect(
      createNFT({ client: client, tokenName: null, tokenSymbol: 'TT' })
    ).rejects.toThrow('Both tokenName and tokenSymbol are required');

    await expect(
      createNFT({
        client: client,
        tokenName: 'TestToken',
        tokenSymbol: null,
      })
    ).rejects.toThrow('Both tokenName and tokenSymbol are required');

    client.close();
  });
});
