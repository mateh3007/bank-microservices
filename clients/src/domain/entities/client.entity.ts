import { BaseEntity } from './base.entity';

export interface ClientEntity extends BaseEntity {
  fullname: string;
  email: string;
  password: string;
  registration: string;
  dateOfBirth: Date;
  avatarFile: string;
  addressId: string;
  phone?: string;
}
