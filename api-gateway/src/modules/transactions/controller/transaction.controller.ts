import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionUseCase } from '../use-cases/transaction.use-case';
import { Client } from 'src/common/decorators/user.decorator';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUseCase: TransactionUseCase) {}

  @ApiBearerAuth()
  @Get(':id')
  async getTransactionById(@Param('id') transactionId: string) {
    return this.transactionUseCase.getTransactionById(transactionId);
  }

  @ApiBearerAuth()
  @Get('get-all')
  async GetAllTransactions(@Client('clientId') clientId: string) {
    return this.transactionUseCase.getAllTransactions(clientId);
  }
}
