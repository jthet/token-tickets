import getClient from '../src/services/account/getClient.js';
import mintNFT from '../src/services/tokens/mintNFT.js';
import createNFT from '../src/services/tokens/createNFT.js';

jest.setTimeout(30000); // Increase timeout for async operations

describe('mintNFT', () => {
  test('should mint NFTs successfully', async () => {
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
      tokenName: 'My NFT',
      tokenSymbol: 'MNFT',
    });

    const mintReceipt = await mintNFT({
      client,
      tokenId,
      supplyKey,
      CID,
    });

    expect(mintReceipt.status.toString()).toBe('SUCCESS');
    expect(mintReceipt.serials.length).toBe(CID.length);

    client.close();
  });
});
