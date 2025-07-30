import { Module } from '@nestjs/common';
import { ExceptionsAdapter } from 'src/domain/adapters/exception.adapter';
import { ExceptionsIntegration } from 'src/infra/integrations/exceptions';

@Module({
  providers: [{ provide: ExceptionsAdapter, useClass: ExceptionsIntegration }],
  exports: [{ provide: ExceptionsAdapter, useClass: ExceptionsIntegration }],
})
export class ExceptionsModule {}
