import { CreateTransactionUseCase } from '@application/use-cases/transactions/create/create-transaction.use-case';
import { GetAllTransactionsUseCase } from '@application/use-cases/transactions/get-all/get-all-transactions.use-case';
import { GetTransactionByIdUseCase } from '@application/use-cases/transactions/get-by-id/get-transaction-by-id.use-case';
import { Module } from '@nestjs/common';
import { CreateTransactionController } from '@presentation/controllers/transactions/create/create-transaction.controller';
import { GetAllTransactionController } from '@presentation/controllers/transactions/get-all/get-all-transactions.controller';
import { GetTransactionByIdController } from '@presentation/controllers/transactions/get-by-id/get-transaction-by-id.controller';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [DatabaseModule, ExceptionsModule, ClientsModule],
  providers: [
    CreateTransactionUseCase,
    GetAllTransactionsUseCase,
    GetTransactionByIdUseCase,
  ],
  controllers: [
    CreateTransactionController,
    GetAllTransactionController,
    GetTransactionByIdController,
  ],
  exports: [],
})
export class TransactionsModule {}
