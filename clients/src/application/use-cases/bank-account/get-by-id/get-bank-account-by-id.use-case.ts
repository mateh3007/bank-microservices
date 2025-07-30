import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBankAccountByIdUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(clientId: string): Promise<GetBankAccountByIdReturn | void> {
    const bankAccount =
      await this.bankAccountRepository.getByClientId(clientId);

    if (!bankAccount) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank account not found',
      });
    }

    return bankAccount;
  }
}
