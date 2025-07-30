import { TransactionEntity } from '@domain/entities/transaction.entity';
import {
  CreateTransactionParams,
  CreatedTransactionReturn,
} from '@domain/interfaces/transaction.interface';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { Prisma } from '@infra/configs/prisma/prisma.config';
import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: Prisma) {}

  async create(
    params: CreateTransactionParams,
  ): Promise<CreatedTransactionReturn | void> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...params,
        status: TransactionStatus.pending,
      },
    });

    if (!transaction) return;

    return transaction;
  }

  async getById(id: string): Promise<TransactionEntity | void> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) return;

    return {
      id: transaction.id,
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      amount: transaction.amount,
      status: transaction.status as TransactionStatus,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  async getAllByAccountId(accountId: string): Promise<TransactionEntity[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        senderId: accountId,
      },
    });

    return transactions;
  }
}
