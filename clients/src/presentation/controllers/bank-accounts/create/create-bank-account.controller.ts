import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountUseCase } from '@application/use-cases/bank-account/create/create-banking-account.use-case';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { CreatedBankAccountDto } from './dtos/created-bank-account.dto';
import { CreateBankAccountResponses } from 'src/presentation/swagger/responses/bank-accounts/create-bank-account.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class CreateBankAccountController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
  ) {}

  @Post('create')
  @CreateBankAccountResponses
  async create(
    @Body() createBankAccountDto: CreateBankAccountDto,
  ): Promise<CreatedBankAccountDto | void> {
    return await this.createBankAccountUseCase.execute(createBankAccountDto);
  }
}
