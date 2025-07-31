import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTransactionByIdUseCase {
  constructor(
    private readonly transactionsRepository: TransactionRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(
    transactionId: string,
    clientId: string,
  ): Promise<TransactionEntity | void> {
    const transaction = await this.transactionsRepository.getById(
      transactionId,
      clientId,
    );

    if (!transaction) {
      return this.exceptionsAdapter.notFound({
        message: 'Transaction Not Founded',
      });
    }

    return transaction;
  }
}
