import { ExceptionsAdapter } from 'src/domain/adapters/exception.adapter';
import { BankAccountRepository } from 'src/domain/repositories/bank-account.repository';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import {
  CreateBankAccountUseCase,
  CreateBankAccountUseCaseParams,
} from './create-banking-account.use-case';
import * as bcrypt from 'bcrypt';
import * as generator from 'src/shared/functions/generate-account-number.function';

describe('CreateBankAccountUseCase', () => {
  let useCase: CreateBankAccountUseCase;
  let bankAccountRepository: jest.Mocked<BankAccountRepository>;
  let clientRepository: jest.Mocked<ClientRepository>;
  let exceptionsAdapter: jest.Mocked<ExceptionsAdapter>;

  beforeEach(() => {
    bankAccountRepository = {
      create: jest.fn(),
    } as any;

    clientRepository = {
      getByEmail: jest.fn(),
      getByRegistration: jest.fn(),
    } as any;

    exceptionsAdapter = {
      badRequest: jest.fn(),
    } as any;

    useCase = new CreateBankAccountUseCase(
      bankAccountRepository,
      clientRepository,
      exceptionsAdapter,
    );

    jest.spyOn(generator, 'GenerateAccountNumber').mockReturnValue('ACC123456');
    jest
      .spyOn(bcrypt, 'hash')
      .mockResolvedValue('hashed-password' as unknown as never);
  });

  const payload: CreateBankAccountUseCaseParams = {
    fullname: 'John Doe',
    email: 'john@example.com',
    password: 'securepass',
    registration: '123456',
    phone: '123-456-7890',
    dateOfBirth: new Date('1990-01-01'),
    avatarFile: 'avatar.png',
    street: 'Main St',
    number: '100',
    complement: 'Apt 1',
    neighborhood: 'Downtown',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'USA',
    agency: '001',
    bankName: 'Bank of Nest',
  };

  it('should create bank account successfully', async () => {
    clientRepository.getByEmail.mockResolvedValue(null);
    clientRepository.getByRegistration.mockResolvedValue(null);

    const expectedAccount = {
      clientId: 'client-1',
      fullname: payload.fullname,
      email: payload.email,
      registration: payload.registration,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      avatarFile: payload.avatarFile,
      address: {
        id: 'address-1',
        street: payload.street,
        number: payload.number,
        complement: payload.complement,
        neighborhood: payload.neighborhood,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        country: payload.country,
      },
      accountNumber: 'ACC123456',
      balance: '0',
      agency: payload.agency,
      bankName: payload.bankName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bankAccountRepository.create.mockResolvedValue(expectedAccount);

    const result = await useCase.execute(payload);

    expect(clientRepository.getByEmail).toHaveBeenCalledWith(payload.email);
    expect(clientRepository.getByRegistration).toHaveBeenCalledWith(
      payload.registration,
    );
    expect(bcrypt.hash).toHaveBeenCalledWith(payload.password, 10);
    expect(generator.GenerateAccountNumber).toHaveBeenCalled();
    expect(bankAccountRepository.create).toHaveBeenCalledWith({
      ...payload,
      password: 'hashed-password',
      accountNumber: 'ACC123456',
    });
    expect(result).toEqual(expectedAccount);
  });

  it('should return badRequest if email is already in use', async () => {
    clientRepository.getByEmail.mockResolvedValue({
      id: 'client-1',
      avatarFile: payload.avatarFile,
      email: payload.email,
      fullname: payload.fullname,
      registration: payload.registration,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      addressId: 'address-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await useCase.execute(payload);

    expect(exceptionsAdapter.badRequest).toHaveBeenCalledWith({
      message: 'Email is already in use.',
    });
    expect(bankAccountRepository.create).not.toHaveBeenCalled();
  });

  it('should return badRequest if registration is already in use', async () => {
    clientRepository.getByEmail.mockResolvedValue(null);
    clientRepository.getByRegistration.mockResolvedValue({
      id: 'client-1',
      avatarFile: payload.avatarFile,
      email: payload.email,
      fullname: payload.fullname,
      registration: payload.registration,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      addressId: 'address-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await useCase.execute(payload);

    expect(exceptionsAdapter.badRequest).toHaveBeenCalledWith({
      message: 'Registration number is already in use.',
    });
    expect(bankAccountRepository.create).not.toHaveBeenCalled();
  });

  it('should return badRequest if bank account creation fails', async () => {
    clientRepository.getByEmail.mockResolvedValue(null);
    clientRepository.getByRegistration.mockResolvedValue(null);
    bankAccountRepository.create.mockResolvedValue(null);

    await useCase.execute(payload);

    expect(exceptionsAdapter.badRequest).toHaveBeenCalledWith({
      message: 'Failed to create bank account.',
    });
  });
});
