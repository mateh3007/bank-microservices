import { Module } from '@nestjs/common';
import { CreateBankAccountUseCase } from '@application/use-cases/bank-account/create/create-banking-account.use-case';
import { ExceptionsModule } from '../exceptions';
import { DatabaseModule } from '../database/database.module';
import { CreateBankAccountController } from 'src/presentation/controllers/bank-accounts/create/create-bank-account.controller';
import { GetBankAccountByIdUseCase } from '@application/use-cases/bank-account/get-by-id/get-bank-account-by-id.use-case';
import { GetBankAccountByIdController } from '@presentation/controllers/bank-accounts/get-by-id/get-bank-account-by-id.controller';
import { GetBankAccountDetailsByIdController } from '@presentation/controllers/bank-accounts/get-bank-account-details/get-bank-account-details.controller';
import { VerifyIfAccountExistsController } from '@presentation/controllers/bank-accounts/verify-if-account-exists/verify-if-account-exists.controller';
import { GetBankAccountDetailsByIdUseCase } from '@application/use-cases/bank-account/get-bank-account-details/get-bank-account-details.use-case';
import { VerifyIfAccountExistsUseCase } from '@application/use-cases/bank-account/verify-if-account-exists/verify-if-account-exists.use-case';

@Module({
  imports: [ExceptionsModule, DatabaseModule],
  controllers: [
    CreateBankAccountController,
    GetBankAccountByIdController,
    GetBankAccountDetailsByIdController,
    VerifyIfAccountExistsController,
  ],
  providers: [
    CreateBankAccountUseCase,
    GetBankAccountByIdUseCase,
    GetBankAccountDetailsByIdUseCase,
    VerifyIfAccountExistsUseCase,
  ],
})
export class BankAccountModule {}
