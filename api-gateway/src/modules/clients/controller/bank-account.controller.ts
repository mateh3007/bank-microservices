import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { BankAccountUseCase } from '../use-cases/bank-accounts/bank-accounts.use-case';
import { LoginDto } from './dtos/auth/login.dto';
import { CreateBankAccountDto } from './dtos/bank-accounts/create/create-bank-account.dto';
import { CreatedBankAccountDto } from './dtos/bank-accounts/create/created-bank-account.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dtos/bank-accounts/deposit/deposit.dto';
import { GetBankAccountDetailsReturn } from '../interfaces/bank-account.interface';
import { Client } from 'src/common/decorators/user.decorator';
import { CreateTransactionDto } from './dtos/bank-accounts/create-transaction/create-transaction.dto';

@ApiTags('Bank Account')
@Controller('bank-accounts')
export class BankAccountController {
  constructor(private readonly bankAccountUseCase: BankAccountUseCase) {}

  @Public()
  @Get('health-check')
  async healthCheck() {
    return { status: 'ok' };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() payload: LoginDto) {
    return await this.bankAccountUseCase.login(payload);
  }

  @Public()
  @Post('create')
  async createBankAccount(
    @Body() payload: CreateBankAccountDto,
  ): Promise<CreatedBankAccountDto> {
    return await this.bankAccountUseCase.createBankAccount(payload);
  }

  @ApiBearerAuth()
  @Post('deposit')
  async deposit(
    @Body() payload: DepositDto,
    @Client('clientId') clientId: string,
  ): Promise<GetBankAccountDetailsReturn | void> {
    return await this.bankAccountUseCase.deposit({
      ...payload,
      clientId,
    });
  }

  @ApiBearerAuth()
  @Post('create-transaction')
  async createTransaction(
    @Body() payload: CreateTransactionDto,
  ): Promise<boolean | void> {
    return await this.bankAccountUseCase.createTransaction(payload);
  }

  @Get('bank-details/:id')
  async getBankDetails(@Param('id') id: string) {
    return this.bankAccountUseCase.getBankAccountDetails(id);
  }

  @Get(':id')
  async getBankAccount(@Param('id') id: string) {
    return this.bankAccountUseCase.getBankAccount(id);
  }

  @Get('verify-exists/:id')
  async verifyBankAccountExists(@Param('id') id: string) {
    return this.bankAccountUseCase.verifyIfBankAccountExists(id);
  }
}
