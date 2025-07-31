import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
