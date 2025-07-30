import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { VerifyIfAccountExistsUseCase } from './verify-if-account-exists.use-case';

describe('VerifyIfAccountExistsUseCase', () => {
  let useCase: VerifyIfAccountExistsUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  beforeEach(() => {
    bankAccountRepository = {
      getByClientId: jest.fn(),
    } as any;

    useCase = new VerifyIfAccountExistsUseCase(bankAccountRepository);
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

    expect(result).toEqual(true);
    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith(clientId);
  });

  it('should call notFound if bank account is not found', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(null);

    const result = await useCase.execute(clientId);

    expect(result).toEqual(false);
  });
});
