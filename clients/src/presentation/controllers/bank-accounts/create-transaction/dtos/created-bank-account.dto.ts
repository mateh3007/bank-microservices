import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatedTransactionDto {
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
  @IsEmail()
  senderId: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password (min 6 characters)',
  })
  @IsNumber()
  @Length(6, 100)
  amount: number;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'File name of the profile avatar',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
