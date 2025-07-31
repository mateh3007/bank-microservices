import { GetTransactionByIdUseCase } from './get-transaction-by-id.use-case';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  TransactionEntity,
  TransactionStatus,
} from '@domain/entities/transaction.entity';

describe('GetTransactionByIdUseCase', () => {
  let useCase: GetTransactionByIdUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    transactionRepository = {
      getById: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
    } as any;

    useCase = new GetTransactionByIdUseCase(
      transactionRepository,
      exceptionsAdapter,
    );
  });

  it('should return the transaction when found', async () => {
    const transactionId = 'tx-123';
    const mockTransaction: TransactionEntity = {
      id: transactionId,
      senderId: 'account-1',
      receiverId: 'account-2',
      amount: 150,
      description: 'Compra',
      createdAt: new Date('2025-07-30T12:00:00Z'),
      status: TransactionStatus.PENDING,
      updatedAt: new Date('2025-07-30T12:00:00Z'),
    };

    transactionRepository.getById.mockResolvedValue(mockTransaction);

    const result = await useCase.execute(transactionId);

    expect(result).toEqual(mockTransaction);
    expect(transactionRepository.getById).toHaveBeenCalledWith(transactionId);
  });

  it('should return notFound when transaction does not exist', async () => {
    const transactionId = 'tx-999';

    transactionRepository.getById.mockResolvedValue(undefined);

    await useCase.execute(transactionId);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Transaction Not Founded',
    });
    expect(transactionRepository.getById).toHaveBeenCalledWith(transactionId);
  });
});
