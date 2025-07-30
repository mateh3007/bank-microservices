import { AuthGuard } from '@infra/common/guards/auth';
import { Prisma } from '@infra/configs/prisma/prisma.config';
import { JwtIntegration } from '@infra/integrations/token/jwt';
import { PrismaClientRepository } from '@infra/repositories/prisma/client.repository';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RouteAuthenticationUseCase } from 'src/application/use-cases/authentication/route-authentication';

const clientRepository = new PrismaClientRepository(new Prisma());
const tokenService = new JwtIntegration(new JwtService());
const routerValidatorUseCase = new RouteAuthenticationUseCase(
  clientRepository,
  tokenService,
);

export const AuthDecorator = (): MethodDecorator =>
  applyDecorators(
    UseGuards(new AuthGuard(routerValidatorUseCase)),
    ApiBearerAuth(),
  );
