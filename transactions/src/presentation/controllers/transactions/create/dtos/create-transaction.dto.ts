import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'ID do usuário que irá receber a transação',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  receiverId: string;

  @ApiProperty({
    description: 'Valor da transação em reais',
    example: 150.75,
    type: Number,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01, { message: 'O valor deve ser maior que zero' })
  amount: number;

  @ApiPropertyOptional({
    description: 'Descrição da transação',
    example: 'Pagamento por serviços prestados',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
