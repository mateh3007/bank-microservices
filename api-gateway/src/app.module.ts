import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [ClientsModule, AuthModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
