import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class AddressResponseDto {
  @Expose()
  id: string;

  @Expose()
  street: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  zipCode: string;

  @Expose()
  country: string;

  @Expose()
  @IsOptional()
  neighborhood?: string;

  @Expose()
  @IsOptional()
  number?: string;

  @Expose()
  @IsOptional()
  complement?: string;
}

export class CreatedBankAccountDto {
  @Expose()
  clientId: string;

  @Expose()
  fullname: string;

  @Expose()
  email: string;

  @Expose()
  registration: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  phone: string;

  @Expose()
  @Type(() => AddressResponseDto)
  address: AddressResponseDto;

  @Expose()
  accountNumber: string;

  @Expose()
  balance: string;

  @Expose()
  agency: string;

  @Expose()
  bankName: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
