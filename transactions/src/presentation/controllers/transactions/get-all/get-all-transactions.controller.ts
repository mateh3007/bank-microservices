import { GetAllTransactionsUseCase } from '@application/use-cases/transactions/get-all/get-all-transactions.use-case';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllTransactionsResponses } from '@presentation/swagger/responses/transactions/get-all-transactions.response';

@ApiTags('Transactions')
@Controller('transactions')
export class GetAllTransactionController {
  constructor(
    private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
  ) {}

  @Get()
  @GetAllTransactionsResponses
  async getAll(clientId: string): Promise<TransactionEntity[]> {
    return await this.getAllTransactionsUseCase.execute(clientId);
  }
}
