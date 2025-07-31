import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { AuthenticationModule } from '../authentication';
import { TokenModule } from '../token';
import { ProfileModule } from '../profile/profile.module';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ExceptionsModule,
    AuthenticationModule,
    BankAccountModule,
    TokenModule,
    ProfileModule,
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
