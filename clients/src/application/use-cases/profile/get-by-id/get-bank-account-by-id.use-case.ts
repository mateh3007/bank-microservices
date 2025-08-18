import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { CacheAdapter } from '@domain/adapters/redis.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProfileUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
    private readonly cache: CacheAdapter,
  ) {}

  async execute(payload: string): Promise<GetBankAccountByIdReturn | void> {
    const cacheKey = `bank-account:${payload}`;

    const cached = await this.cache.get<GetBankAccountByIdReturn>(cacheKey);
    if (cached) {
      return cached;
    }

    const bankAccount = await this.bankAccountRepository.getByClientId(payload);

    if (!bankAccount) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank account not found',
      });
    }

    await this.cache.set(cacheKey, bankAccount, 180);

    return bankAccount;
  }
}
