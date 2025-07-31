import { BaseEntity } from './base.entity';

export interface TransactionEntity extends BaseEntity {
  senderId: string;
  receiverId: string;
  amount: number;
  description?: string;
  status: string;
}
