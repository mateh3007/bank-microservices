import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
