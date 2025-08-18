import { TokenAdapter } from '@domain/adapters/token';
import { ClientEntity } from '@domain/entities/client.entity';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Injectable } from '@nestjs/common';

interface AuthenticatedHeader extends Headers {
  authorization?: string;
}

export interface AuthenticatedRequest extends Request {
  client?: ClientEntity;
  headers: AuthenticatedHeader;
}

@Injectable()
export class RouteAuthenticationUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly tokenService: TokenAdapter,
  ) {}

  public async validate(payload: AuthenticatedRequest): Promise<boolean> {
    const bearerToken = payload?.headers?.authorization;

    if (!bearerToken) return false;

    const token = bearerToken.split(' ')[1];
    const clientSubscription =
      await this.tokenService.getPayloadFromToken(token);

    if (!clientSubscription) return false;

    const client = await this.clientRepository.getByIdToLogin(
      clientSubscription.id,
    );

    if (!client) return false;

    payload.client = client;

    return true;
  }
}
