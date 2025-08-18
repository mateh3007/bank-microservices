import { GetBankAccountDetailsByIdUseCase } from '@application/use-cases/bank-account/get-bank-account-details/get-bank-account-details.use-case';
import { GetBankAccountDetailsReturn } from '@domain/interfaces/bank-account.interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetBankAccountDetailsByIdResponses } from '@presentation/swagger/responses/bank-accounts/get-bank-account-details.response';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class GetBankAccountDetailsByIdController {
  constructor(
    private readonly getBankAccountDetailsByIdUseCase: GetBankAccountDetailsByIdUseCase,
  ) {}

  @Get('bank-details/:id')
  @GetBankAccountDetailsByIdResponses
  async getById(
    @Param('id') param: string,
  ): Promise<GetBankAccountDetailsReturn | void> {
    return this.getBankAccountDetailsByIdUseCase.execute(param);
  }
}
