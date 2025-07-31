import { BaseEntity } from './base.entity';

export interface BankAccountEntity extends BaseEntity {
  clientId: string;
  agency: string;
  accountNumber: string;
  bankName: string;
  balance: number;
}
