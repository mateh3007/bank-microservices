import { TransactionEntity } from '@domain/entities/transaction.entity';
import {
  CreatedTransactionReturn,
  CreateTransactionParams,
} from '@domain/interfaces/transaction.interface';

export abstract class TransactionRepository {
  abstract create(
    transaction: CreateTransactionParams,
  ): Promise<CreatedTransactionReturn | void>;
  abstract getById(id: string): Promise<TransactionEntity | void>;
  abstract getAllByAccountId(accountId: string): Promise<TransactionEntity[]>;
}
