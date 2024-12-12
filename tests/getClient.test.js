import getClient from '../src/services/account/getClient.js';
import { defaultAccountId, defaultPrivateKey } from '../src/config/dotenv.js';

describe('getClient', () => {
  let client;

  afterEach(() => {
    if (client) {
      client.close();
      client = null;
    }
  });

  test('should return a client with default credentials', () => {
    client = getClient();
    expect(client.operatorAccountId.toString()).toBe(defaultAccountId);
  });

  test('should return a client with default operatorId same as given accountID', () => {
    client = getClient({
      accountId: defaultAccountId,
      privateKey: defaultPrivateKey,
      network: 'testnet',
    });
    expect(client.operatorAccountId.toString()).toBe(defaultAccountId);
  });

  test('should throw error with nonDER PrivateKey', () => {
    const accountId = '0.0.1234567';
    const privateKey = 'abc';
    try {
      getClient({ accountId, privateKey });
      throw new Error('Expected getClient to throw an error');
    } catch (e) {
      console.log('Caught error:', e);
      expect(e).toBeInstanceOf(Error);
    }
  });

  test('should return a client for testnet when network is testnet', () => {
    client = getClient({
      accountId: defaultAccountId,
      privateKey: defaultPrivateKey,
      network: 'testnet',
    });
    // ledgerIds: 0 = mainnet, 1 = testnet, 2 = previewnet
    console.log(client.ledgerId);
    expect(client.ledgerId._ledgerId.toString()).toBe('1');
  });
});
