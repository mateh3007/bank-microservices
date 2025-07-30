import { BankAccountRepository } from 'src/domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from 'src/domain/adapters/exception.adapter';
import { CreateAddressParams } from 'src/domain/interfaces/address.interfaces';
import {
  CreateBankAccountParams,
  CreatedBankAccountReturn,
} from 'src/domain/interfaces/bank-account.interfaces';
import { CreateClientParams } from 'src/domain/interfaces/client.interfaces';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GenerateAccountNumber } from 'src/shared/functions/generate-account-number.function';
import { ClientRepository } from 'src/domain/repositories/client.repository';

export interface CreateBankAccountUseCaseParams
  extends Omit<CreateClientParams, 'addressId'>,
    Omit<CreateBankAccountParams, 'clientId' | 'accountNumber'>,
    CreateAddressParams {}

@Injectable()
export class CreateBankAccountUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly clientRepository: ClientRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute(
    payload: CreateBankAccountUseCaseParams,
  ): Promise<CreatedBankAccountReturn | void> {
    const emailAlreadyInUse = await this.clientRepository.getByEmail(
      payload.email,
    );
    if (emailAlreadyInUse) {
      return this.exceptionsAdapter.badRequest({
        message: 'Email is already in use.',
      });
    }

    const userAlreadyExists = await this.clientRepository.getByRegistration(
      payload.registration,
    );
    if (userAlreadyExists) {
      return this.exceptionsAdapter.badRequest({
        message: 'Registration number is already in use.',
      });
    }

    const bankAccount = await this.bankAccountRepository.create({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
      accountNumber: GenerateAccountNumber(),
    });

    if (!bankAccount) {
      return this.exceptionsAdapter.badRequest({
        message: 'Failed to create bank account.',
      });
    }

    return bankAccount;
  }
}
