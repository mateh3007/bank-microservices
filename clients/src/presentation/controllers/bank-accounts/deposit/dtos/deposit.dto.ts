import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({
    example: 123,
    description: 'Password (min 6 characters)',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: '123',
    description: 'Client UUID',
  })
  @IsString()
  clientId: string;
}
