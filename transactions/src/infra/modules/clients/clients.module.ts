import { ClientsAdapter } from '@domain/adapters/client.adapter';
import { ClientsIntegration } from '@infra/integrations/clients/clients.integration';
import { Module } from '@nestjs/common';

@Module({
  providers: [{ provide: ClientsAdapter, useClass: ClientsIntegration }],
  exports: [{ provide: ClientsAdapter, useClass: ClientsIntegration }],
})
export class ClientsModule {}
