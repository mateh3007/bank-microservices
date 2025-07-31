import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  DepositParams,
  GetBankAccountByIdReturn,
  GetBankAccountDetailsReturn,
} from '@domain/interfaces/bank-account.interfaces';
import { DepositUseCase } from './deposit.use-case';

describe('DepositUseCase', () => {
  let depositUseCase: DepositUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      getByClientId: jest.fn(),
      deposit: jest.fn(),
    } as unknown as jest.Mocked<BankAccountRepository>;

    exceptionsAdapter = {
      notFound: jest.fn(),
    } as unknown as jest.Mocked<ExceptionsAdapter>;

    depositUseCase = new DepositUseCase(
      bankAccountRepository,
      exceptionsAdapter,
    );
  });

  it('should return notFound if bank account does not exist', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(null);

    const params: DepositParams = {
      clientId: '123',
      amount: BigInt(100),
    };

    await depositUseCase.execute(params);

    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith('123');
    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Bank Account Not Founded',
    });
  });

  it('should deposit amount and return updated bank account', async () => {
    const mockAccount: GetBankAccountByIdReturn = {
      id: 'acc-1',
      clientId: '',
      fullname: '',
      email: '',
      registration: '',
      dateOfBirth: undefined,
      phone: '',
      address: {
        id: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        neighborhood: '',
        number: '',
        complement: '',
      },
      avatarFile: '',
      agency: '',
      accountNumber: '',
      bankName: '',
      balance: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedAccount: GetBankAccountDetailsReturn = {
      id: 'acc-1',
      clientId: '123',
      balance: '200',
      accountNumber: '1231241421',
      agency: '321321312',
      bankName: 'name',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bankAccountRepository.getByClientId.mockResolvedValue(mockAccount);
    bankAccountRepository.deposit.mockResolvedValue(updatedAccount);

    const params: DepositParams = {
      clientId: '123',
      amount: BigInt(100),
    };

    const result = await depositUseCase.execute(params);

    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith('123');
    expect(bankAccountRepository.deposit).toHaveBeenCalledWith(
      'acc-1',
      BigInt(100),
    );
    expect(result).toEqual(updatedAccount);
  });
});
