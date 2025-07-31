import { HttpGetFunction } from 'src/shared/functions/http/get.function';
import { Injectable } from '@nestjs/common';
import { TransactionReturn } from '../interfaces/transactions.interface';
import { TRANSACTION_URL } from 'src/shared/constants/transaction-url-constant';

@Injectable()
export class TransactionUseCase {
  constructor(private readonly httpGetFunction: HttpGetFunction) {}

  async getTransactionById(
    id: string,
    clientId: string,
  ): Promise<TransactionReturn> {
    return await this.httpGetFunction.requestGet(
      `${TRANSACTION_URL}/transactions/${clientId}/${id}`,
    );
  }

  async getAllTransactions(id: string): Promise<TransactionReturn[]> {
    return await this.httpGetFunction.requestGet(
      `${TRANSACTION_URL}/transactions/get-all/${id}`,
    );
  }
}
