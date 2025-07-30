import { Module } from '@nestjs/common';
import { AddressRepository } from 'src/domain/repositories/address.repository';
import { BankAccountRepository } from 'src/domain/repositories/bank-account.repository';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { Prisma } from 'src/infra/configs/prisma/prisma.config';
import { PrismaAddressRepository } from 'src/infra/repositories/prisma/address.repository';
import { PrismaBankAccountRepository } from 'src/infra/repositories/prisma/bank-account.repository';
import { PrismaClientRepository } from 'src/infra/repositories/prisma/client.repository';

@Module({
  imports: [],
  providers: [
    Prisma,
    { useClass: PrismaClientRepository, provide: ClientRepository },
    { useClass: PrismaAddressRepository, provide: AddressRepository },
    { useClass: PrismaBankAccountRepository, provide: BankAccountRepository },
  ],
  exports: [ClientRepository, AddressRepository, BankAccountRepository],
})
export class DatabaseModule {}
