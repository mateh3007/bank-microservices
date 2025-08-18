import { VerifyIfAccountExistsUseCase } from '@application/use-cases/bank-account/verify-if-account-exists/verify-if-account-exists.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class VerifyIfAccountExistsController {
  constructor(
    private readonly verifyIfAccountExistsUseCase: VerifyIfAccountExistsUseCase,
  ) {}

  @Get('verify-exists/:id')
  async getById(@Param('id') param: string): Promise<boolean> {
    return this.verifyIfAccountExistsUseCase.execute(param);
  }
}
