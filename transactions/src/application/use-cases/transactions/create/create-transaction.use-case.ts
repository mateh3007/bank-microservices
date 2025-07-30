import { ClientsAdapter } from '@domain/adapters/client.adapter';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  CreatedTransactionReturn,
  CreateTransactionParams,
} from '@domain/interfaces/transaction.interface';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly clientsAdapter: ClientsAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(
    input: CreateTransactionParams,
  ): Promise<CreatedTransactionReturn | void> {
    const receiverExists = await this.clientsAdapter.verifyIfBankAccountExists(
      input.receiverId,
    );

    if (!receiverExists) {
      return this.exceptionsAdapter.notFound({
        message: 'Receiver bank account does not exist',
      });
    }

    const senderExists = await this.clientsAdapter.getBankAccountDetails(
      input.senderId,
    );

    if (!senderExists) {
      return this.exceptionsAdapter.notFound({
        message: 'Sender bank account does not exist',
      });
    }

    if (senderExists.balance < input.amount) {
      return this.exceptionsAdapter.badRequest({
        message: 'Insufficient funds in sender bank account',
      });
    }

    return await this.transactionRepository.create(input);
  }
}
