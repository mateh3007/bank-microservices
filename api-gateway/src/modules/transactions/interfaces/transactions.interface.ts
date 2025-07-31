export interface TransactionReturn {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
