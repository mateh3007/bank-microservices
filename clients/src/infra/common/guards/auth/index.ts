import {
  RouteAuthenticationUseCase,
  AuthenticatedRequest,
} from '@application/use-cases/authentication/route-authentication';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly routeAuthenticationUseCase: RouteAuthenticationUseCase,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    return this.routeAuthenticationUseCase.validate(request);
  }
}
