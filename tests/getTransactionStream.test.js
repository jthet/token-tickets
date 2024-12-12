import getTransactionStream from '../src/services/transactions/getTransactionStream.js';
import getTransactions from '../src/services/transactions/getTransactions.js';

jest.mock('../src/services/transactions/getTransactions.js');

describe('getTransactionStream', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    getTransactions.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call getTransactions with correct parameters', async () => {
    getTransactions.mockResolvedValue([]);

    const interval = 1; // 1 second
    const verbose_level = 1;

    getTransactionStream(interval * 1000, verbose_level);

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(interval * 1000);

    expect(getTransactions).toHaveBeenCalledWith({
      lastTimestamp: null,
      testNet: true,
      transactionType: 'cryptoTransfer',
      result: 'success',
      verbose_level: verbose_level,
    });

    // Fast-forward again to simulate the next interval
    jest.advanceTimersByTime(interval * 1000);

    getTransactionStream(interval * 1000, verbose_level);
    expect(getTransactions).toHaveBeenCalledTimes(2);
  });
});