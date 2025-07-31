import {
  GetBankAccountByIdReturn,
  CreateBankAccountParams,
  CreatedBankAccountReturn,
  UpdateBankAccountParams,
  GetBankAccountDetailsReturn,
} from '../interfaces/bank-account.interfaces';

export abstract class BankAccountRepository {
  abstract getByClientId(
    clientId: string,
  ): Promise<GetBankAccountByIdReturn | void>;
  abstract getAccountDetails(
    clientId: string,
  ): Promise<GetBankAccountDetailsReturn | void>;
  abstract getByNumber(
    accountNumber: string,
  ): Promise<CreatedBankAccountReturn | void>;
  abstract create(
    params: CreateBankAccountParams,
  ): Promise<CreatedBankAccountReturn | void>;
  abstract update(
    clientId: string,
    params: UpdateBankAccountParams,
  ): Promise<GetBankAccountByIdReturn | void>;
  abstract addFunds(clientId: string, amount: number): Promise<boolean>;
  abstract removeFunds(clientId: string, amount: number): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract deposit(
    clientId: string,
    amount: number,
  ): Promise<GetBankAccountDetailsReturn | void>;
}
