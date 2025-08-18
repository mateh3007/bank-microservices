import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  DepositParams,
  GetBankAccountDetailsReturn,
} from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepositUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(
    payload: DepositParams,
  ): Promise<GetBankAccountDetailsReturn | void> {
    const bankAccountExists = await this.bankAccountRepository.getByClientId(
      payload.clientId,
    );

    if (!bankAccountExists) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank Account Not Founded',
      });
    }

    const updatedBankAccount = await this.bankAccountRepository.deposit(
      bankAccountExists.clientId,
      payload.amount,
    );

    return updatedBankAccount;
  }
}
