export interface CreateTransactionParams {
  senderId: string;
  receiverId: string;
  amount: bigint;
  description?: string | null;
}

export interface CreatedTransactionReturn {
  id: string;
  senderId: string;
  receiverId: string;
  amount: bigint;
  description?: string | null;
  createdAt: Date;
}
