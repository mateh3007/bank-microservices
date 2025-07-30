import { CreateTransactionUseCase } from '@application/use-cases/transactions/create/create-transaction.use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionResponses } from '@presentation/swagger/responses/transactions/create-transactions.response';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post('create')
  @CreateTransactionResponses
  async create(@Body() body: CreateTransactionDto, senderId: string) {
    return await this.createTransactionUseCase.execute({
      ...body,
      senderId,
    });
  }
}
