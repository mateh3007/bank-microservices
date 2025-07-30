import { Injectable } from '@nestjs/common';
import {
  GetAddressByIdReturn,
  CreateAddressParams,
  UpdateAddressParams,
} from 'src/domain/interfaces/address.interfaces';
import { AddressRepository } from 'src/domain/repositories/address.repository';
import { Prisma } from 'src/infra/configs/prisma/prisma.config';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prisma: Prisma) {}

  async getById(id: string): Promise<GetAddressByIdReturn | void> {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      return;
    }

    return address;
  }

  update(
    id: string,
    address: UpdateAddressParams,
  ): Promise<GetAddressByIdReturn | void> {
    return this.prisma.address.update({
      where: { id },
      data: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      },
    });
  }

  async create(params: CreateAddressParams): Promise<GetAddressByIdReturn> {
    const address = await this.prisma.address.create({
      data: {
        ...params,
      },
    });

    return address;
  }

  async delete(id: string): Promise<boolean> {
    const address = await this.prisma.address.delete({
      where: { id },
    });

    if (!address) {
      return false;
    }

    return true;
  }
}
