export interface GetBankAccountDetailsReturn {
  id: string;
  clientId: string;
  accountNumber: string;
  agency: string;
  bankName: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetBankAccountByIdReturn {
  id: string;
  clientId: string;
  fullname: string;
  email: string;
  registration: string;
  dateOfBirth: Date;
  phone: string;
  address: {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
  };
  avatarFile: string;
  agency: string;
  accountNumber: string;
  bankName: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepositParams {
  clientId: string;
  amount: number;
}

export interface CreateTransactionParams {
  senderId: string;
  receiverId: string;
  amount: number;
  description?: string;
}
