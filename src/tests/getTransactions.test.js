import axios from 'axios';
import getTransactions from '../services/local/transactions/getTransactions';
import { logTransaction } from '../utils/transactions/logger';

jest.mock('axios');
jest.mock('../utils/transactions/logger');

describe('getTransactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the expected transaction when called with limit: 1', async () => {
    const expectedTransaction = {
      bytes: null,
      charged_tx_fee: 34314,
      consensus_timestamp: '1733978935.692120000',
      entity_id: null,
      max_fee: '1000000',
      memo_base64:
        'MTczMzk3ODkzNTQ2NyBNb25pdG9yIGNyeXB0byBoZWRlcmEtbWlycm9yLW1vbml0b3ItNzY4NmZjNjQ3NC12c3Bqaw==',
      name: 'CRYPTOTRANSFER',
      nft_transfers: [],
      node: '0.0.4',
      nonce: 0,
      parent_consensus_timestamp: null,
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash:
        'iQ2emmneq6mTTgTOkrnTJYEMDecuokTCqiUjQXbHQVsdW62a9JQSkB10E7/RVzGj',
      transaction_id: '0.0.90-1733978925-467000000',
      transfers: [
        { account: '0.0.90', amount: -1000000 },
        { account: '0.0.3', amount: 1000000 },
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1733978925.467000000',
    };

    const mockResponse = {
      data: {
        transactions: [expectedTransaction],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const transactions = await getTransactions({ limit: 2 });

    expect(axios.get).toHaveBeenCalledWith(
      'https://testnet.mirrornode.hedera.com/api/v1/transactions',
      {
        params: expect.any(URLSearchParams),
      }
    );

    expect(transactions).toEqual([expectedTransaction]);
    expect(logTransaction).toHaveBeenCalledTimes(1);
    expect(logTransaction).toHaveBeenCalledWith(expectedTransaction, null);
  });

  // Checks the response returns all the correct fields with verbosity = null
  it('should return a transaction with the same fields as expectedTransaction', async () => {
    const expectedTransaction = {
      bytes: null,
      charged_tx_fee: 34314,
      consensus_timestamp: '1733978935.692120000',
      entity_id: null,
      max_fee: '1000000',
      memo_base64:
        'MTczMzk3ODkzNTQ2NyBNb25pdG9yIGNyeXB0byBoZWRlcmEtbWlycm9yLW1vbml0b3ItNzY4NmZjNjQ3NC12c3Bqaw==',
      name: 'CRYPTOTRANSFER',
      nft_transfers: [],
      node: '0.0.4',
      nonce: 0,
      parent_consensus_timestamp: null,
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash:
        'iQ2emmneq6mTTgTOkrnTJYEMDecuokTCqiUjQXbHQVsdW62a9JQSkB10E7/RVzGj',
      transaction_id: '0.0.90-1733978925-467000000',
      transfers: [
        { account: '0.0.90', amount: -1000000 },
        { account: '0.0.3', amount: 1000000 },
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1733978925.467000000',
    };

    const mockResponse = {
      data: {
        transactions: [expectedTransaction],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const transactions = await getTransactions({ limit: 1 });

    expect(axios.get).toHaveBeenCalledWith(
      'https://testnet.mirrornode.hedera.com/api/v1/transactions',
      {
        params: expect.any(URLSearchParams),
      }
    );

    expect(transactions).toHaveLength(1);
    expect(transactions[0]).toMatchObject({
      bytes: null,
      charged_tx_fee: expect.any(Number),
      consensus_timestamp: expect.any(String),
      entity_id: null,
      max_fee: expect.any(String),
      memo_base64: expect.any(String),
      name: expect.any(String),
      nft_transfers: expect.any(Array),
      node: expect.any(String),
      nonce: expect.any(Number),
      parent_consensus_timestamp: null,
      result: expect.any(String),
      scheduled: expect.any(Boolean),
      staking_reward_transfers: expect.any(Array),
      token_transfers: expect.any(Array),
      transaction_hash: expect.any(String),
      transaction_id: expect.any(String),
      transfers: expect.any(Array),
      valid_duration_seconds: expect.any(String),
      valid_start_timestamp: expect.any(String),
    });
  });
});
