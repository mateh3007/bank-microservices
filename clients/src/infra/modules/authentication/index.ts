import { LoginUseCase } from '@application/use-cases/authentication/login';
import { ValidateClientUseCase } from '@application/use-cases/authentication/validate-client';
import { Module } from '@nestjs/common';
import { AuthenticationController } from '@presentation/controllers/authentication';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { TokenModule } from '../token';

@Module({
  imports: [TokenModule, DatabaseModule, ExceptionsModule],
  controllers: [AuthenticationController],
  providers: [LoginUseCase, ValidateClientUseCase],
})
export class AuthenticationModule {}
