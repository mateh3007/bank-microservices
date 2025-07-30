import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountDetailsReturn } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBankAccountDetailsByIdUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(clientId: string): Promise<GetBankAccountDetailsReturn | void> {
    const bankAccount =
      await this.bankAccountRepository.getAccountDetails(clientId);

    if (!bankAccount) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank account not found',
      });
    }

    return bankAccount;
  }
}
