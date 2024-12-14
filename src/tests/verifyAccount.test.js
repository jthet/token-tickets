import verifyAccount from '../src/services/account/verifyAccount.js';
import { defaultAccountId, defaultPrivateKey } from '../src/config/dotenv.js';
import getClient from '../src/services/account/getClient.js';

describe('verifyAccount', () => {
  // const realAccountId = defaultAccountId;
  // const realPrivateKey = defaultPrivateKey;
  const fakeAccountId = '0.0.1234567';
  const fakePrivateKeyString =
    '302e020100300506032b657004220420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  test('do nothing if account is valid', async () => {
    const client = getClient();
    await expect(
      verifyAccount(client, defaultAccountId, defaultPrivateKey)
    ).resolves.not.toThrow();
    client.close();
  });

  test('throw error if account is invalid', async () => {
    const client = getClient();
    await expect(
      verifyAccount(client, fakeAccountId, fakePrivateKeyString)
    ).rejects.toThrow();
    client.close();
  });
});
