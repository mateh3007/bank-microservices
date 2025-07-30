import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { GetBankAccountDetailsReturn } from '@domain/interfaces/bank-account.interfaces';
import { GetBankAccountDetailsByIdUseCase } from './get-bank-account-details.use-case';

describe('GetBankAccountDetailsUseCase', () => {
  let useCase: GetBankAccountDetailsByIdUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      getAccountDetails: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
    } as any;

    useCase = new GetBankAccountDetailsByIdUseCase(
      bankAccountRepository,
      exceptionsAdapter,
    );
  });

  const clientId = 'client-1';
  const bankAccount: GetBankAccountDetailsReturn = {
    id: 'account-1',
    clientId,
    agency: '001',
    accountNumber: '12345678-9',
    bankName: 'Bank of Nest',
    balance: '1000.00',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should return bank account if found', async () => {
    bankAccountRepository.getAccountDetails.mockResolvedValue(bankAccount);

    const result = await useCase.execute(clientId);

    expect(result).toEqual(bankAccount);
    expect(bankAccountRepository.getAccountDetails).toHaveBeenCalledWith(
      clientId,
    );
  });

  it('should call notFound if bank account is not found', async () => {
    bankAccountRepository.getAccountDetails.mockResolvedValue(null);

    await useCase.execute(clientId);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Bank account not found',
    });
  });
});
