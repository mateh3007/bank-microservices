import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionUseCase } from '@application/use-cases/bank-account/create-transaction/create-transaction.use-case';
import { CreateTransactionDto } from './dtos/create-bank-account.dto';
import { CreateTransactionResponses } from '@presentation/swagger/responses/bank-accounts/create-transaction.response';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post('create-transaction')
  @CreateTransactionResponses
  async create(@Body() body: CreateTransactionDto): Promise<boolean | void> {
    return await this.createTransactionUseCase.execute(body);
  }
}
