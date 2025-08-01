import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { CacheAdapter } from '@domain/adapters/redis.adapter'; // ajuste o caminho
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBankAccountByIdUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
    private readonly cache: CacheAdapter,
  ) {}

  async execute(clientId: string): Promise<GetBankAccountByIdReturn | void> {
    const cacheKey = `bank-account:${clientId}`;

    const cached = await this.cache.get<GetBankAccountByIdReturn>(cacheKey);
    if (cached) {
      return cached;
    }

    const bankAccount =
      await this.bankAccountRepository.getByClientId(clientId);

    if (!bankAccount) {
      return this.exceptionsAdapter.notFound({
        message: 'Bank account not found',
      });
    }

    await this.cache.set(cacheKey, bankAccount, 180);

    return bankAccount;
  }
}
