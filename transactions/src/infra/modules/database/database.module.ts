import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { PrismaTransactionRepository } from '@infra/repositories/prisma/transactions.repository';
import { Module } from '@nestjs/common';
import { Prisma } from 'src/infra/configs/prisma/prisma.config';

@Module({
  imports: [],
  providers: [
    Prisma,
    { useClass: PrismaTransactionRepository, provide: TransactionRepository },
  ],
  exports: [TransactionRepository],
})
export class DatabaseModule {}
