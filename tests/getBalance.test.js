import getBalance from '../src/services/account/getBalance';
import getClient from '../src/services/account/getClient';
import { AccountBalanceQuery } from '@hashgraph/sdk';

jest.mock('../src/services/account/getClient');
jest.mock('@hashgraph/sdk');

describe('getBalance', () => {
  let mockClient;
  let mockAccountBalanceQuery;

  beforeEach(() => {
    mockClient = {
      close: jest.fn(),
    };

    mockAccountBalanceQuery = {
      setAccountId: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({
        hbars: {
          toString: jest.fn().mockReturnValue('1000 HBAR'),
        },
      }),
    };

    getClient.mockReturnValue(mockClient);
    AccountBalanceQuery.mockImplementation(() => mockAccountBalanceQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return the account balance', async () => {
    const accountId = '0.0.1234567';
    const balance = await getBalance({ client: mockClient, accountId });

    expect(mockAccountBalanceQuery.setAccountId).toHaveBeenCalledWith(
      accountId
    );
    expect(mockAccountBalanceQuery.execute).toHaveBeenCalledWith(mockClient);
    expect(mockClient.close).toHaveBeenCalled();
    expect(balance.hbars.toString()).toBe('1000 HBAR');
  });

  test('should throw an error if accountId or client is missing', async () => {
    await expect(
      getBalance({ client: null, accountId: '0.0.1234567' })
    ).rejects.toThrow(
      'Both accountId and client are required to get the account balance'
    );

    await expect(
      getBalance({ client: mockClient, accountId: null })
    ).rejects.toThrow(
      'Both accountId and client are required to get the account balance'
    );
  });
});
