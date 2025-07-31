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
    example: '1231313123',
    description: 'Id of de sender transaction',
  })
  @IsString()
  senderId: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password (min 6 characters)',
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
