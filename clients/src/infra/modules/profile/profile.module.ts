import { GetBankAccountByIdUseCase } from '@application/use-cases/bank-account/get-by-id/get-bank-account-by-id.use-case';
import { GetProfileController } from '@presentation/controllers/profile/get-by-id/get-bank-account-by-id.controller';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { Module } from '@nestjs/common';
import { UpdateBankAccountController } from '@presentation/controllers/profile/update/update-bank-account.controller';
import { DeleteBankAccountController } from '@presentation/controllers/profile/delete/delete-bank-account.repository';
import { UpdateBankAccountUseCase } from '@application/use-cases/profile/update/update-bank-account.use-case';
import { DeleteBankAccountUseCase } from '@application/use-cases/profile/delete/delete-bank-account.use-case';

@Module({
  imports: [ExceptionsModule, DatabaseModule],
  controllers: [
    UpdateBankAccountController,
    GetProfileController,
    DeleteBankAccountController,
  ],
  providers: [
    UpdateBankAccountUseCase,
    GetBankAccountByIdUseCase,
    DeleteBankAccountUseCase,
  ],
})
export class ProfileModule {}
