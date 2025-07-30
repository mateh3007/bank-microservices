import { GetBankAccountByIdUseCase } from '@application/use-cases/bank-account/get-by-id/get-bank-account-by-id.use-case';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetBankAccountByIdResponses } from '@presentation/swagger/responses/bank-accounts/get-bank-account-by-id.response';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class GetBankAccountByIdController {
  constructor(
    private readonly getBankAccountByIdUseCase: GetBankAccountByIdUseCase,
  ) {}

  @Get(':id')
  @GetBankAccountByIdResponses
  async getById(
    @Param('id') id: string,
  ): Promise<GetBankAccountByIdReturn | void> {
    return this.getBankAccountByIdUseCase.execute(id);
  }
}
