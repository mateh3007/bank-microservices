import {
  ClientsAdapter,
  GetBankAccountDetailsReturn,
} from '@domain/adapters/client.adapter';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import axios from 'axios';

export class ClientsIntegration implements ClientsAdapter {
  private baseUrl =
    process.env.CLIENTS_SERVICE_URL ||
    'http://microservice-clients:3010/api/v1';

  constructor(private readonly exceptionsAdapter: ExceptionsAdapter) {}

  async getBankAccountDetails(
    clientId: string,
  ): Promise<GetBankAccountDetailsReturn | void> {
    try {
      await axios.get(
        `${this.baseUrl}/bank-accounts/verify-exists/${clientId}`,
      );
    } catch (err) {
      if (err.response?.status === 404) {
        return this.exceptionsAdapter.notFound({
          message: 'Cliente não encontrado',
        });
      }
      throw new Error('Erro ao verificar cliente');
    }
  }

  async verifyIfBankAccountExists(clientId: string): Promise<boolean> {
    try {
      const data = await axios.get(
        `${this.baseUrl}/bank-accounts/bank-details/${clientId}`,
      );

      if (!data) return false;

      return true;
    } catch (err) {
      if (err.response?.status === 404) {
        this.exceptionsAdapter.notFound({
          message: 'Cliente não encontrado',
        });
      }
      throw new Error('Erro ao verificar cliente');
    }
  }
}
