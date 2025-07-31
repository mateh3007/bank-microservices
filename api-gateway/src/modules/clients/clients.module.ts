import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BankAccountController } from './controller/bank-account.controller';
import { BankAccountUseCase } from './use-cases/bank-accounts/bank-accounts.use-case';
import { HttpGetFunction } from 'src/shared/functions/http/get.function';
import { HttpPostFunction } from 'src/shared/functions/http/post.function';
import { HttpPatchFunction } from 'src/shared/functions/http/patch.function';
import { HttpDeleteFunction } from 'src/shared/functions/http/delete.function';
import { ProfileController } from './controller/profile.controller';
import { ProfileUseCase } from './use-cases/profiles/profile.use-case';

@Module({
  imports: [HttpModule],
  controllers: [BankAccountController, ProfileController],
  providers: [
    BankAccountUseCase,
    ProfileUseCase,
    HttpGetFunction,
    HttpPostFunction,
    HttpPatchFunction,
    HttpDeleteFunction,
  ],
})
export class ClientsModule {}
