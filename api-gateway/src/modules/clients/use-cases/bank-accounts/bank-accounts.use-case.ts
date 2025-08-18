import { CLIENT_URL } from 'src/shared/constants/client-url-constant';
import { HttpGetFunction } from 'src/shared/functions/http/get.function';
import { HttpPostFunction } from 'src/shared/functions/http/post.function';
import { LoginDto } from '../../controller/dtos/auth/login.dto';
import { CreateBankAccountDto } from '../../controller/dtos/bank-accounts/create/create-bank-account.dto';
import { CreatedBankAccountDto } from '../../controller/dtos/bank-accounts/create/created-bank-account.dto';
import {
  GetBankAccountDetailsReturn,
  GetBankAccountByIdReturn,
  DepositParams,
  CreateTransactionParams,
} from '../../interfaces/bank-account.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountUseCase {
  constructor(
    private readonly httpGetFunction: HttpGetFunction,
    private readonly httpPostFunction: HttpPostFunction,
  ) {}

  async login(payload: LoginDto): Promise<{ accessToken: string } | void> {
    return await this.httpPostFunction.requestPost(`${CLIENT_URL}/auth/login`, {
      email: payload.email,
      password: payload.password,
    });
  }

  async createBankAccount(
    payload: CreateBankAccountDto,
  ): Promise<CreatedBankAccountDto> {
    return this.httpPostFunction.requestPost(
      `${CLIENT_URL}/bank-accounts/create`,
      {
        ...payload,
      },
    );
  }

  async createTransaction(
    payload: CreateTransactionParams,
  ): Promise<boolean | void> {
    return this.httpPostFunction.requestPost(
      `${CLIENT_URL}/bank-accounts/create-transaction`,
      {
        ...payload,
      },
    );
  }

  async deposit(
    payload: DepositParams,
  ): Promise<GetBankAccountDetailsReturn | void> {
    return this.httpPostFunction.requestPost(
      `${CLIENT_URL}/bank-accounts/deposit`,
      {
        ...payload,
      },
    );
  }

  async getBankAccountDetails(
    payload: string,
  ): Promise<GetBankAccountDetailsReturn> {
    return await this.httpGetFunction.requestGet(
      `${CLIENT_URL}/bank-accounts/bank-details/${payload}`,
    );
  }

  async getBankAccount(payload: string): Promise<GetBankAccountByIdReturn> {
    return await this.httpGetFunction.requestGet(
      `${CLIENT_URL}/bank-accounts/${payload}`,
    );
  }

  async verifyIfBankAccountExists(payload: string): Promise<boolean> {
    return await this.httpGetFunction.requestGet(
      `${CLIENT_URL}/bank-accounts/verify-exists/${payload}`,
    );
  }
}
