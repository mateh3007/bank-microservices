import { CreateTransactionUseCase } from './create-transaction.use-case';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { ClientsAdapter } from '@domain/adapters/client.adapter';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import {
  CreateTransactionParams,
  CreatedTransactionReturn,
} from '@domain/interfaces/transaction.interface';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let clientsAdapter: jest.Mocked<ClientsAdapter>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    transactionRepository = {
      create: jest.fn(),
    } as any;

    clientsAdapter = {
      verifyIfBankAccountExists: jest.fn(),
      getBankAccountDetails: jest.fn(),
    } as any;

    exceptionsAdapter = {
      notFound: jest.fn(),
      badRequest: jest.fn(),
    } as any;

    useCase = new CreateTransactionUseCase(
      transactionRepository,
      clientsAdapter,
      exceptionsAdapter,
    );
  });

  const input: CreateTransactionParams = {
    senderId: 'client-1',
    receiverId: 'client-2',
    amount: 500,
    description: 'Transferência',
  };

  const senderAccount = {
    id: 'account-1',
    balance: 100,
    accountNumber: '123456',
    agency: '0001',
    bankName: 'Bank A',
    clientId: 'client-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdTransaction: CreatedTransactionReturn = {
    id: 'tx-1',
    senderId: input.senderId,
    receiverId: input.receiverId,
    amount: input.amount,
    description: input.description,
    createdAt: new Date(),
  };

  it('should create transaction successfully', async () => {
    clientsAdapter.verifyIfBankAccountExists.mockResolvedValue(true);
    clientsAdapter.getBankAccountDetails.mockResolvedValue({
      ...senderAccount,
      balance: 1000,
    });
    transactionRepository.create.mockResolvedValue(createdTransaction);

    const result = await useCase.execute(input);

    expect(result).toEqual(createdTransaction);
    expect(clientsAdapter.verifyIfBankAccountExists).toHaveBeenCalledWith(
      input.receiverId,
    );
    expect(clientsAdapter.getBankAccountDetails).toHaveBeenCalledWith(
      input.senderId,
    );
    expect(transactionRepository.create).toHaveBeenCalledWith(input);
  });

  it('should return notFound if receiver does not exist', async () => {
    clientsAdapter.verifyIfBankAccountExists.mockResolvedValue(false);

    await useCase.execute(input);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Receiver bank account does not exist',
    });
    expect(clientsAdapter.getBankAccountDetails).not.toHaveBeenCalled();
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });

  it('should return notFound if sender does not exist', async () => {
    clientsAdapter.verifyIfBankAccountExists.mockResolvedValue(true);
    clientsAdapter.getBankAccountDetails.mockResolvedValue(null);

    await useCase.execute(input);

    expect(exceptionsAdapter.notFound).toHaveBeenCalledWith({
      message: 'Sender bank account does not exist',
    });
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });

  it('should return badRequest if sender has insufficient funds', async () => {
    clientsAdapter.verifyIfBankAccountExists.mockResolvedValue(true);
    clientsAdapter.getBankAccountDetails.mockResolvedValue({
      id: 'account-1',
      balance: 100,
      accountNumber: '123456',
      agency: '0001',
      bankName: 'Bank A',
      clientId: 'client-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await useCase.execute(input);

    expect(exceptionsAdapter.badRequest).toHaveBeenCalledWith({
      message: 'Insufficient funds in sender bank account',
    });
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });
});
