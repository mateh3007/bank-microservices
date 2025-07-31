import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({
    example: 123,
    description: 'Password (min 6 characters)',
  })
  @IsNumber()
  amount: number;
}
