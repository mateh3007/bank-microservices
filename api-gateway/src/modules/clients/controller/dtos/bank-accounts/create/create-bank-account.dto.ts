import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBankAccountDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the client' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password (min 6 characters)',
  })
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'File name of the profile avatar',
  })
  @IsString()
  @IsNotEmpty()
  avatarFile: string;

  @ApiProperty({
    example: '123456789',
    description: 'Unique client registration number',
  })
  @IsString()
  @IsNotEmpty()
  registration: string;

  @ApiProperty({ example: '+1 555 123 4567', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth (ISO format)',
  })
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ example: '1234', description: 'Bank agency number' })
  @IsString()
  @IsNotEmpty()
  agency: string;

  @ApiProperty({ example: 'Bank of America', description: 'Name of the bank' })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({ example: '123 Main St', description: 'Street name' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '456', description: 'House or building number' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiPropertyOptional({
    example: 'Apt 101',
    description: 'Additional address information (optional)',
  })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({ example: 'Downtown', description: 'Neighborhood or district' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: 'New York', description: 'City name' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'NY', description: 'State abbreviation' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '10001', description: 'Postal or ZIP code' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 'USA', description: 'Country name' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
