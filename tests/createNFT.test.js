import createNFT from '../src/services/tokens/createNFT';
import getClient from '../src/services/account/getClient';
import {
  Client,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} from '@hashgraph/sdk';
import { defaultAccountId } from '../src/config/dotenv';

jest.mock('../src/services/account/getClient');
jest.mock('@hashgraph/sdk');

describe('createNFT', () => {
  let mockClient;
  let mockTokenCreateTransaction;
  let mockPrivateKey;

  beforeEach(() => {
    mockClient = {
      close: jest.fn(),
    };

    mockPrivateKey = {
      toStringDer: jest.fn().mockReturnValue('mockPrivateKeyDer'),
    };

    mockTokenCreateTransaction = {
      setTokenName: jest.fn().mockReturnThis(),
      setTokenSymbol: jest.fn().mockReturnThis(),
      setTokenType: jest.fn().mockReturnThis(),
      setDecimals: jest.fn().mockReturnThis(),
      setInitialSupply: jest.fn().mockReturnThis(),
      setTreasuryAccountId: jest.fn().mockReturnThis(),
      setSupplyType: jest.fn().mockReturnThis(),
      setMaxSupply: jest.fn().mockReturnThis(),
      setSupplyKey: jest.fn().mockReturnThis(),
      freezeWith: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue({
        execute: jest.fn().mockResolvedValue({
          getReceipt: jest.fn().mockResolvedValue({
            tokenId: 'mockTokenId',
          }),
        }),
      }),
    };

    getClient.mockReturnValue(mockClient);
    PrivateKey.generateED25519.mockReturnValue(mockPrivateKey);
    PrivateKey.fromStringDer.mockReturnValue(mockPrivateKey);
    TokenCreateTransaction.mockImplementation(() => mockTokenCreateTransaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an NFT and return tokenId and supplyKey', async () => {
    const tokenName = 'TestToken';
    const tokenSymbol = 'TT';
    const maxSupply = 250;
    const supplyType = TokenSupplyType.Finite;

    const result = await createNFT({
      client: mockClient,
      tokenName,
      tokenSymbol,
      maxSupply,
      supplyType,
    });

    expect(mockTokenCreateTransaction.setTokenName).toHaveBeenCalledWith(
      tokenName
    );
    expect(mockTokenCreateTransaction.setTokenSymbol).toHaveBeenCalledWith(
      tokenSymbol
    );
    expect(mockTokenCreateTransaction.setTokenType).toHaveBeenCalledWith(
      TokenType.NonFungibleUnique
    );
    expect(mockTokenCreateTransaction.setDecimals).toHaveBeenCalledWith(0);
    expect(mockTokenCreateTransaction.setInitialSupply).toHaveBeenCalledWith(0);
    expect(
      mockTokenCreateTransaction.setTreasuryAccountId
    ).toHaveBeenCalledWith(defaultAccountId);
    expect(mockTokenCreateTransaction.setSupplyType).toHaveBeenCalledWith(
      supplyType
    );
    expect(mockTokenCreateTransaction.setMaxSupply).toHaveBeenCalledWith(
      maxSupply
    );
    expect(mockTokenCreateTransaction.setSupplyKey).toHaveBeenCalledWith(
      mockPrivateKey
    );
    expect(mockTokenCreateTransaction.freezeWith).toHaveBeenCalledWith(
      mockClient
    );
    expect(mockTokenCreateTransaction.sign).toHaveBeenCalledWith(
      mockPrivateKey
    );
    expect(mockClient.close).toHaveBeenCalled();

    expect(result.tokenId).toBe('mockTokenId');
    expect(result.supplyKey).toBe(mockPrivateKey);
  });

  test('should throw an error if tokenName or tokenSymbol is missing', async () => {
    await expect(
      createNFT({ client: mockClient, tokenName: null, tokenSymbol: 'TT' })
    ).rejects.toThrow('Both tokenName and tokenSymbol are required');

    await expect(
      createNFT({
        client: mockClient,
        tokenName: 'TestToken',
        tokenSymbol: null,
      })
    ).rejects.toThrow('Both tokenName and tokenSymbol are required');
  });
});
