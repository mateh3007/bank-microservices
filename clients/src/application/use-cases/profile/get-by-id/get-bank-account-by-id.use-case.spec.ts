import { GetBankAccountByIdUseCase } from './get-bank-account-by-id.use-case';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';

describe('GetBankAccountByIdUseCase', () => {
  let useCase: GetBankAccountByIdUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      getByClientId: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
    } as any;

    useCase = new GetBankAccountByIdUseCase(
      bankAccountRepository,
      exceptionsAdapter,
    );
  });

  const clientId = 'client-1';
  const bankAccount: GetBankAccountByIdReturn = {
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

  it('should return bank account if found', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(bankAccount);

    const result = await useCase.execute(clientId);

    expect(result).toEqual(bankAccount);
    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith(clientId);
  });

  it('should call notFound if bank account is not found', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(null);

    await useCase.execute(clientId);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Bank account not found',
    });
  });
});
