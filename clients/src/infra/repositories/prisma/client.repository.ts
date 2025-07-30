import { ClientEntity } from '@domain/entities/client.entity';
import { Injectable } from '@nestjs/common';
import {
  GetClientByIdReturn,
  CreateClientParams,
  UpdateClientParams,
} from 'src/domain/interfaces/client.interfaces';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { Prisma } from 'src/infra/configs/prisma/prisma.config';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: Prisma) {}

  async getByRegistration(
    registration: string,
  ): Promise<GetClientByIdReturn | void> {
    const client = await this.prisma.client.findUnique({
      where: { registration },
    });

    if (!client) {
      return;
    }

    return client;
  }

  async getByEmail(email: string): Promise<GetClientByIdReturn | void> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!client) {
      return;
    }

    return client;
  }

  async getByEmailToLogin(email: string): Promise<ClientEntity | void> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!client) return;

    return client;
  }

  async getById(id: string): Promise<GetClientByIdReturn | void> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return;
    }

    return client;
  }

  async getByIdToLogin(id: string): Promise<ClientEntity | void> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) return;

    return client;
  }

  async create(params: CreateClientParams): Promise<GetClientByIdReturn> {
    const { addressId, ...clientData } = params;
    const client = await this.prisma.client.create({
      data: {
        ...clientData,
        address: {
          connect: {
            id: params.addressId,
          },
        },
      },
    });

    return client;
  }

  async update(
    id: string,
    params: UpdateClientParams,
  ): Promise<GetClientByIdReturn | void> {
    const client = await this.prisma.client.update({
      where: { id },
      data: params,
    });

    if (!client) {
      return;
    }

    return client;
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.prisma.client.delete({
      where: { id },
    });

    return !!client;
  }
}
