import { Injectable } from '@nestjs/common';
import {
  GetBankAccountByIdReturn,
  CreateBankAccountParams,
  CreatedBankAccountReturn,
  UpdateBankAccountParams,
  GetBankAccountDetailsReturn,
} from 'src/domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from 'src/domain/repositories/bank-account.repository';
import { Prisma } from 'src/infra/configs/prisma/prisma.config';

@Injectable()
export class PrismaBankAccountRepository implements BankAccountRepository {
  constructor(private readonly prisma: Prisma) {}

  async update(
    clientId: string,
    params: UpdateBankAccountParams,
  ): Promise<GetBankAccountByIdReturn | void> {
    return await this.prisma.$transaction(async (prisma) => {
      const bankAccount = await prisma.bankAccount.findFirst({
        where: {
          clientId,
        },
      });

      if (!bankAccount) return;

      const updatedBankAccount = await prisma.bankAccount.update({
        where: {
          id: bankAccount.id,
        },
        data: {
          agency: params.agency,
          accountNumber: params.accountNumber,
          bankName: params.bankName,
          client: {
            update: {
              fullname: params.fullname,
              email: params.email,
              registration: params.registration,
              dateOfBirth: params.dateOfBirth,
              phone: params.phone,
              address: {
                update: {
                  street: params.address.street,
                  city: params.address.city,
                  state: params.address.state,
                  zipCode: params.address.zipCode,
                  country: params.address.country,
                  neighborhood: params.address.neighborhood,
                  number: params.address.number,
                  complement: params.address.complement,
                },
              },
            },
          },
        },
        include: {
          client: {
            include: {
              address: true,
            },
          },
        },
      });

      return {
        id: updatedBankAccount.id,
        clientId: updatedBankAccount.clientId,
        fullname: updatedBankAccount.client.fullname,
        email: updatedBankAccount.client.email,
        registration: updatedBankAccount.client.registration,
        dateOfBirth: updatedBankAccount.client.dateOfBirth,
        phone: updatedBankAccount.client.phone,
        address: {
          id: updatedBankAccount.client.address.id,
          street: updatedBankAccount.client.address.street,
          city: updatedBankAccount.client.address.city,
          state: updatedBankAccount.client.address.state,
          zipCode: updatedBankAccount.client.address.zipCode,
          country: updatedBankAccount.client.address.country,
          neighborhood: updatedBankAccount.client.address.neighborhood,
          number: updatedBankAccount.client.address.number,
          complement: updatedBankAccount.client.address.complement,
        },
        avatarFile: updatedBankAccount.client.avatarFile,
        bankName: updatedBankAccount.bankName,
        accountNumber: updatedBankAccount.accountNumber,
        balance: updatedBankAccount.balance.toString(),
        agency: updatedBankAccount.agency,
        createdAt: updatedBankAccount.createdAt,
        updatedAt: updatedBankAccount.updatedAt,
      };
    });
  }

  async getByClientId(
    clientId: string,
  ): Promise<GetBankAccountByIdReturn | void> {
    return await this.prisma.$transaction(async (prisma) => {
      const bankAccount = await prisma.bankAccount.findFirst({
        where: {
          clientId,
        },
        include: {
          client: {
            include: {
              address: true,
            },
          },
        },
      });

      if (!bankAccount) return;

      return {
        id: bankAccount.id,
        clientId: bankAccount.clientId,
        fullname: bankAccount.client.fullname,
        email: bankAccount.client.email,
        registration: bankAccount.client.registration,
        dateOfBirth: bankAccount.client.dateOfBirth,
        phone: bankAccount.client.phone,
        address: {
          id: bankAccount.client.address.id,
          street: bankAccount.client.address.street,
          city: bankAccount.client.address.city,
          state: bankAccount.client.address.state,
          zipCode: bankAccount.client.address.zipCode,
          country: bankAccount.client.address.country,
          neighborhood: bankAccount.client.address.neighborhood,
          number: bankAccount.client.address.number,
          complement: bankAccount.client.address.complement,
        },
        avatarFile: bankAccount.client.avatarFile,
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        balance: bankAccount.balance.toString(),
        agency: bankAccount.agency,
        createdAt: bankAccount.createdAt,
        updatedAt: bankAccount.updatedAt,
      };
    });
  }

  async getByNumber(
    accountNumber: string,
  ): Promise<GetBankAccountByIdReturn | void> {
    return await this.prisma.$transaction(async (prisma) => {
      const bankAccount = await prisma.bankAccount.findUnique({
        where: {
          accountNumber,
        },
        include: {
          client: {
            include: {
              address: true,
            },
          },
        },
      });

      if (!bankAccount) return;

      return {
        id: bankAccount.id,
        clientId: bankAccount.clientId,
        fullname: bankAccount.client.fullname,
        email: bankAccount.client.email,
        registration: bankAccount.client.registration,
        dateOfBirth: bankAccount.client.dateOfBirth,
        phone: bankAccount.client.phone,
        address: {
          id: bankAccount.client.address.id,
          street: bankAccount.client.address.street,
          city: bankAccount.client.address.city,
          state: bankAccount.client.address.state,
          zipCode: bankAccount.client.address.zipCode,
          country: bankAccount.client.address.country,
          neighborhood: bankAccount.client.address.neighborhood,
          number: bankAccount.client.address.number,
          complement: bankAccount.client.address.complement,
        },
        avatarFile: bankAccount.client.avatarFile,
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        balance: bankAccount.balance.toString(),
        agency: bankAccount.agency,
        createdAt: bankAccount.createdAt,
        updatedAt: bankAccount.updatedAt,
      };
    });
  }

  async getAccountDetails(
    clientId: string,
  ): Promise<GetBankAccountDetailsReturn | void> {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { clientId },
    });

    if (!bankAccount) return;

    return {
      id: bankAccount.id,
      clientId: bankAccount.clientId,
      accountNumber: bankAccount.accountNumber,
      agency: bankAccount.agency,
      bankName: bankAccount.bankName,
      balance: bankAccount.balance.toString(),
      createdAt: bankAccount.createdAt,
      updatedAt: bankAccount.updatedAt,
    };
  }

  async create(
    params: CreateBankAccountParams,
  ): Promise<CreatedBankAccountReturn | void> {
    return this.prisma.$transaction(async (prisma) => {
      const address = await prisma.address.create({
        data: {
          street: params.street,
          city: params.city,
          state: params.state,
          zipCode: params.zipCode,
          country: params.country,
          neighborhood: params.neighborhood,
          number: params.number,
          complement: params.complement,
        },
      });

      if (!address) return;

      const client = await prisma.client.create({
        data: {
          fullname: params.fullname,
          avatarFile: params.avatarFile,
          password: params.password,
          email: params.email,
          registration: params.registration,
          dateOfBirth: params.dateOfBirth,
          phone: params.phone,
          addressId: address.id,
        },
      });

      if (!client) return;

      const bankAccount = await prisma.bankAccount.create({
        data: {
          clientId: client.id,
          agency: params.agency,
          accountNumber: params.accountNumber,
          bankName: params.bankName,
          balance: BigInt(0),
        },
      });

      return {
        clientId: bankAccount.clientId,
        fullname: params.fullname,
        email: params.email,
        registration: params.registration,
        dateOfBirth: params.dateOfBirth,
        phone: params.phone,
        address: {
          id: address.id,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
          neighborhood: address.neighborhood,
          number: address.number,
          complement: address.complement,
        },
        accountNumber: bankAccount.accountNumber,
        balance: bankAccount.balance.toString(),
        avatarFile: params.avatarFile,
        agency: bankAccount.agency,
        bankName: bankAccount.bankName,
        createdAt: bankAccount.createdAt,
        updatedAt: bankAccount.updatedAt,
      };
    });
  }

  async delete(id: string): Promise<boolean> {
    return this.prisma.$transaction(async (prisma) => {
      const bankAccount = await prisma.bankAccount.findUnique({
        where: { id },
      });

      if (!bankAccount) return false;

      await prisma.bankAccount.delete({
        where: { id: bankAccount.id },
      });

      const client = await prisma.client.findUnique({
        where: { id: bankAccount.clientId },
      });

      if (!client) return false;

      await prisma.client.delete({
        where: { id: client.id },
      });

      const address = await prisma.address.findUnique({
        where: { id: client.addressId },
      });

      if (!address) return false;

      await prisma.address.delete({
        where: { id: address.id },
      });
    });
  }

  async addFunds(clientId: string, amount: bigint): Promise<boolean> {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: {
        clientId,
      },
    });

    if (!bankAccount) return false;

    await this.prisma.bankAccount.update({
      where: {
        id: bankAccount.id,
      },
      data: {
        balance: bankAccount.balance + amount,
      },
    });

    return true;
  }

  async removeFunds(clientId: string, amount: bigint): Promise<boolean> {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: {
        clientId,
      },
    });

    if (!bankAccount) return false;

    await this.prisma.bankAccount.update({
      where: {
        id: bankAccount.id,
      },
      data: {
        balance: bankAccount.balance - amount,
      },
    });

    return true;
  }
}
