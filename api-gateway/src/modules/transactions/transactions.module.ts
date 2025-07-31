import { HttpModule } from '@nestjs/axios';
import { TransactionUseCase } from './use-cases/transaction.use-case';
import { Module } from '@nestjs/common';
import { HttpDeleteFunction } from 'src/shared/functions/http/delete.function';
import { HttpGetFunction } from 'src/shared/functions/http/get.function';
import { HttpPatchFunction } from 'src/shared/functions/http/patch.function';
import { HttpPostFunction } from 'src/shared/functions/http/post.function';
import { TransactionController } from './controller/transaction.controller';

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    TransactionUseCase,
    HttpGetFunction,
    HttpPostFunction,
    HttpPatchFunction,
    HttpDeleteFunction,
  ],
})
export class TransactionsModule {}
