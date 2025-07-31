import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { MessagingModule } from '../messaging/messaging.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ExceptionsModule,
    MessagingModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
