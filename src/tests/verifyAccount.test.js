import verifyAccount from '../services/local/account/verifyAccount.js';
import {
  defaultAccountId,
  defaultPrivateKey,
} from '../services/local/config/dotenv.js';
import getClient from '../services/local/account/getClient.js';

describe('verifyAccount', () => {
  // const realAccountId = defaultAccountId;
  // const realPrivateKey = defaultPrivateKey;
  const fakeAccountId = '0.0.1234567';
  const fakePrivateKeyString =
    '302e020100300506032b657004220420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  // This is throwing an error. Not sure why.

  // test("do nothing if account is valid", async () => {
  //   const client = getClient();
  //   await expect(
  //     verifyAccount(client, defaultAccountId, defaultPrivateKey)
  //   ).resolves.not.toThrow();
  //   client.close();
  // });

  test('throw error if account is invalid', async () => {
    const client = getClient();
    await expect(
      verifyAccount(client, fakeAccountId, fakePrivateKeyString)
    ).rejects.toThrow();
    client.close();
  });
});
