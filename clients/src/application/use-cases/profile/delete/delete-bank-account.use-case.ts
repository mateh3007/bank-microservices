import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteBankAccountUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(clientId: string): Promise<void> {
    const bankAccount =
      await this.bankAccountRepository.getByClientId(clientId);
    if (!bankAccount) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank account not found',
      });
    }

    await this.bankAccountRepository.delete(bankAccount.id);

    return;
  }
}
