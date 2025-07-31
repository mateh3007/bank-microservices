import { CreateAddressParams } from './address.interfaces';
import { CreateClientParams } from './client.interfaces';

export interface CreateBankAccountParams
  extends Omit<CreateClientParams, 'addressId'>,
    CreateAddressParams {
  agency: string;
  bankName: string;
  accountNumber: string;
}

export interface CreatedBankAccountReturn {
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
  accountNumber: string;
  balance: string;
  avatarFile: string;
  agency: string;
  bankName: string;
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

export interface UpdateBankAccountParams {
  fullname?: string;
  email?: string;
  registration?: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
  };
  avatarFile?: string;
  agency?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface CreateTransactionParams {
  senderId: string;
  receiverId: string;
  amount: bigint;
  description?: string;
}
