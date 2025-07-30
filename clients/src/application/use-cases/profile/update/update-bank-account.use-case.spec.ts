import { UpdateBankAccountUseCase } from './update-bank-account.use-case';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  GetBankAccountByIdReturn,
  UpdateBankAccountParams,
} from '@domain/interfaces/bank-account.interfaces';

describe('UpdateBankAccountUseCase', () => {
  let useCase: UpdateBankAccountUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      getByClientId: jest.fn(),
      update: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
    } as any;

    useCase = new UpdateBankAccountUseCase(
      bankAccountRepository,
      exceptionsAdapter,
    );
  });

  const clientId = 'client-1';

  const existingBankAccount: GetBankAccountByIdReturn = {
    id: 'account-1',
    clientId,
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    registration: '123456789',
    dateOfBirth: new Date('1990-01-01'),
    phone: '+55 84 99999-9999',
    address: {
      id: 'addr-1',
      street: 'Rua das Flores',
      city: 'Natal',
      state: 'RN',
      zipCode: '59000-000',
      country: 'Brasil',
      neighborhood: 'Centro',
      number: '123',
      complement: 'Apto 101',
    },
    avatarFile: 'avatar.jpg',
    agency: '001',
    accountNumber: '12345678-9',
    bankName: 'Bank of Nest',
    balance: '1000.00',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updatePayload: UpdateBankAccountParams = {
    fullname: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+55 84 98888-8888',
    address: {
      street: 'Rua Nova',
      city: 'Natal',
      state: 'RN',
      zipCode: '59000-001',
      country: 'Brasil',
    },
  };

  const updatedBankAccount: GetBankAccountByIdReturn = {
    ...existingBankAccount,
    ...updatePayload,
    address: {
      ...existingBankAccount.address,
      ...updatePayload.address,
    },
    updatedAt: new Date(),
  };

  it('should update and return bank account successfully', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(existingBankAccount);
    bankAccountRepository.update.mockResolvedValue(updatedBankAccount);

    const result = await useCase.execute(clientId, updatePayload);

    expect(result).toEqual(updatedBankAccount);
    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith(clientId);
    expect(bankAccountRepository.update).toHaveBeenCalledWith(
      clientId,
      updatePayload,
    );
  });

  it('should call notFound if bank account does not exist', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(null);

    await useCase.execute(clientId, updatePayload);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Bank account not found',
    });
    expect(bankAccountRepository.update).not.toHaveBeenCalled();
  });
});
