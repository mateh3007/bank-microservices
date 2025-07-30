import { GetAllTransactionsUseCase } from './get-all-transactions.use-case';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import {
  TransactionEntity,
  TransactionStatus,
} from '@domain/entities/transaction.entity';

describe('GetAllTransactionsUseCase', () => {
  let useCase: GetAllTransactionsUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = {
      getAllByAccountId: jest.fn(),
    } as any;

    useCase = new GetAllTransactionsUseCase(transactionRepository);
  });

  it('should return all transactions for a given accountId', async () => {
    const accountId = 'account-123';

    const mockTransactions: TransactionEntity[] = [
      {
        id: 'tx-1',
        senderId: accountId,
        receiverId: 'account-456',
        amount: 100,
        status: TransactionStatus.PENDING,
        description: 'Transferência recebida',
        createdAt: new Date('2025-07-29T15:30:00Z'),
        updatedAt: new Date('2025-07-29T15:30:00Z'),
      },
      {
        id: 'tx-2',
        senderId: 'account-789',
        receiverId: accountId,
        amount: 250,
        status: TransactionStatus.PENDING,
        description: 'Transferência recebida',
        createdAt: new Date('2025-07-29T15:30:00Z'),
        updatedAt: new Date('2025-07-29T15:30:00Z'),
      },
    ];

    transactionRepository.getAllByAccountId.mockResolvedValue(mockTransactions);

    const result = await useCase.execute(accountId);

    expect(result).toEqual(mockTransactions);
    expect(transactionRepository.getAllByAccountId).toHaveBeenCalledWith(
      accountId,
    );
  });
});
