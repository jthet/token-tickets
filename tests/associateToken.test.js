import getClient from '../src/services/account/getClient.js';
import associateToken from '../src/services/tokens/associateToken.js'; // Adjust the import path as needed
import createAccount from '../src/services/account/createAccount.js';

describe('associateToken', () => {
  test('placeholder', async () => {
    const client = getClient();

    const { receipt, newAccountPublicKey, newAccountPrivateKey } =
      await createAccount(client);
    const newAccountId = receipt.accountId;

    const tokenId = '0.0.5258853';

    const associateAccountRx = await associateToken(
      client,
      tokenId,
      newAccountId,
      newAccountPrivateKey
    );
    expect(associateAccountRx.status.toString()).toBe('SUCCESS');

    client.close();
  });
});
