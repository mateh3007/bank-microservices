import { IsUUID, IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  receiverId: string;

  @IsNumber()
  @Min(0.01, { message: 'O valor deve ser maior que zero' })
  amount: number;

  @IsOptional()
  @IsString()
  description?: string | null;
}
