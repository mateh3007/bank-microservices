import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepositUseCase } from '@application/use-cases/bank-account/deposit/deposit.use-case';
import { DepositResponses } from '@presentation/swagger/responses/bank-accounts/deposit.response';
import { GetBankAccountDetailsReturn } from '@domain/interfaces/bank-account.interfaces';
import { DepositDto } from './dtos/deposit.dto';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class DepositController {
  constructor(private readonly depositUseCase: DepositUseCase) {}

  @Post('deposit')
  @DepositResponses
  async create(
    @Body() depositDto: DepositDto,
  ): Promise<GetBankAccountDetailsReturn | void> {
    return await this.depositUseCase.execute({
      clientId: depositDto.clientId,
      amount: depositDto.amount,
    });
  }
}
