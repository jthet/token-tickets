import { verifyAccountIdAndPrivateKey } from '../src/services/account/verifyAccount.js';
import { PrivateKey, AccountInfoQuery } from '@hashgraph/sdk';
import getClient from '../src/services/account/getClient.js';

jest.mock('@hashgraph/sdk');
jest.mock('../src/services/account/getClient.js');

describe('verifyAccountIdAndPrivateKey', () => {
  let mockClient;
  const accountId = '0.0.1234567';
  const privateKeyString =
    '302e020100300506032b657004220420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  const mockPublicKey = {
    toString: jest.fn().mockReturnValue('mockPublicKey'),
  };

  beforeEach(() => {
    mockClient = {
      close: jest.fn(),
    };
    getClient.mockReturnValue(mockClient);

    AccountInfoQuery.mockImplementation(() => {
      return {
        setAccountId: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({
          key: mockPublicKey,
        }),
      };
    });

    PrivateKey.fromStringDer.mockImplementation(() => ({
      publicKey: {
        toString: jest.fn().mockReturnValue('mockPublicKey'),
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns true for matching accountId and privateKey', async () => {
    const client = getClient();
    const valid = await verifyAccountIdAndPrivateKey({
      client: client,
      accountId: accountId,
      privateKeyString: privateKeyString,
    });
    expect(valid).toBe(true);
    expect(mockClient.close).toHaveBeenCalled();
  });

  test('returns false for non-matching privateKey or accountId', async () => {
    const randomPrivateKey =
      '302e020100300506032b657004220420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const randomAccountId = '0.0.99999';

    PrivateKey.fromStringDer.mockReturnValue({
      publicKey: { toString: jest.fn().mockReturnValue('randomPublicKey') },
    });
    AccountInfoQuery.prototype.execute.mockResolvedValue({
      key: { toString: jest.fn().mockReturnValue('mockPublicKey') },
    });

    const client = getClient();
    const valid = await verifyAccountIdAndPrivateKey({
      client: client,
      accountId: randomAccountId,
      privateKeyString: randomPrivateKey,
    });

    expect(valid).toBe(false);
    expect(mockClient.close).toHaveBeenCalled();
  });
});