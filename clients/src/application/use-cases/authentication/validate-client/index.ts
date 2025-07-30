import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { ClientEntity } from '@domain/entities/client.entity';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateClientUseCase {
  constructor(
    private readonly exceptionsAdapter: ExceptionsAdapter,
    private readonly clientRepository: ClientRepository,
  ) {}

  async validate(client: ClientEntity): Promise<ClientEntity | void> {
    const clientExists = await this.clientRepository.getById(client.id);
    if (!clientExists)
      return this.exceptionsAdapter.notFound({
        message: 'Client not found',
      });

    return client;
  }
}
