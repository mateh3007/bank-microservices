import { DeleteBankAccountUseCase } from './delete-bank-account.use-case';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';

describe('DeleteBankAccountUseCase', () => {
  let useCase: DeleteBankAccountUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      getByClientId: jest.fn(),
      delete: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
      internalServerError: jest.fn(),
    } as any;

    useCase = new DeleteBankAccountUseCase(
      bankAccountRepository,
      exceptionsAdapter,
    );
  });

  const clientId = 'client-1';
  const bankAccount = {
    id: 'account-1',
    clientId,
    agency: '001',
    accountNumber: '12345678-9',
    bankName: 'Bank of Nest',
    balance: BigInt(1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should delete bank account successfully', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(bankAccount);
    bankAccountRepository.delete.mockResolvedValue(true);

    await expect(useCase.execute(clientId)).resolves.toBeUndefined();

    expect(bankAccountRepository.getByClientId).toHaveBeenCalledWith(clientId);
    expect(bankAccountRepository.delete).toHaveBeenCalledWith(bankAccount.id);
  });

  it('should return notFound if bank account does not exist', async () => {
    bankAccountRepository.getByClientId.mockResolvedValue(null);

    await useCase.execute(clientId);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Bank account not found',
    });
    expect(bankAccountRepository.delete).not.toHaveBeenCalled();
  });
});
