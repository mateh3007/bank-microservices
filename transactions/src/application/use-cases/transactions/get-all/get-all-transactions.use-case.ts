import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllTransactionsUseCase {
  constructor(private readonly transactionsRepository: TransactionRepository) {}

  async execute(accountId: string): Promise<TransactionEntity[]> {
    const transactions =
      await this.transactionsRepository.getAllBySenderAccountId(accountId);

    return transactions;
  }
}
