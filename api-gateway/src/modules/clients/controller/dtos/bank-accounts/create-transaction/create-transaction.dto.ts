import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: '12313123',
    description: 'Id of de receiver transaction',
  })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    example: 100,
    description: 'Deposit Amount',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'File name of the profile avatar',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
