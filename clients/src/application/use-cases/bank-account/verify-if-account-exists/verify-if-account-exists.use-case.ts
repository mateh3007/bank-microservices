import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyIfAccountExistsUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(payload: string): Promise<boolean> {
    const bankAccount = await this.bankAccountRepository.getByClientId(payload);

    if (!bankAccount) return false;

    return true;
  }
}
