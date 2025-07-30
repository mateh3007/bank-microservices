import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionRepository } from '@domain/repositories/transaction.repository';

export class GetTransactionByIdUseCase {
  constructor(
    private readonly transactionsRepository: TransactionRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(transactionId: string): Promise<TransactionEntity | void> {
    const transaction =
      await this.transactionsRepository.getById(transactionId);

    if (!transaction) {
      return this.exceptionsAdapter.notFound({
        message: 'Transaction Not Founded',
      });
    }

    return transaction;
  }
}
