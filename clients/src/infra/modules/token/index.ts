import { Module } from '@nestjs/common';

import { JwtIntegration } from '@infra/integrations/token/jwt';
import { JwtModule } from '@nestjs/jwt';
import { TokenAdapter } from '@domain/adapters/token';
import { env } from 'process';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [{ provide: TokenAdapter, useClass: JwtIntegration }],
  exports: [{ provide: TokenAdapter, useClass: JwtIntegration }],
})
export class TokenModule {}
