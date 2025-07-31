import { GetAllTransactionsUseCase } from '@application/use-cases/transactions/get-all/get-all-transactions.use-case';
import { GetTransactionByIdUseCase } from '@application/use-cases/transactions/get-by-id/get-transaction-by-id.use-case';
import { Module } from '@nestjs/common';
import { GetAllTransactionController } from '@presentation/controllers/transactions/get-all/get-all-transactions.controller';
import { GetTransactionByIdController } from '@presentation/controllers/transactions/get-by-id/get-transaction-by-id.controller';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [DatabaseModule, ExceptionsModule, MessagingModule],
  providers: [GetAllTransactionsUseCase, GetTransactionByIdUseCase],
  controllers: [GetAllTransactionController, GetTransactionByIdController],
  exports: [],
})
export class TransactionsModule {}
