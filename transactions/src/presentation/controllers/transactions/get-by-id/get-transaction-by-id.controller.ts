import { GetTransactionByIdUseCase } from '@application/use-cases/transactions/get-by-id/get-transaction-by-id.use-case';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetTransactionByIdResponses } from '@presentation/swagger/responses/transactions/get-transaction-by-id.response';

@ApiTags('Transactions')
@Controller('transactions')
export class GetTransactionByIdController {
  constructor(
    private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,
  ) {}

  @Get(':id')
  @GetTransactionByIdResponses
  async getById(@Param('id') id: string): Promise<TransactionEntity | void> {
    return await this.getTransactionByIdUseCase.execute(id);
  }
}
