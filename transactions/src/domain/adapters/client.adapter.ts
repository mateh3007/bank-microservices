export interface GetBankAccountDetailsReturn {
  id: string;
  clientId: string;
  accountNumber: string;
  agency: string;
  bankName: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class ClientsAdapter {
  abstract getBankAccountDetails(
    clientId: string,
  ): Promise<GetBankAccountDetailsReturn | void>;
  abstract verifyIfBankAccountExists(clientId: string): Promise<boolean>;
}
