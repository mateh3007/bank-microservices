import { LoginUseCaseParams } from '@application/use-cases/authentication/login';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto implements LoginUseCaseParams {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'user@admin.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '1234',
  })
  @IsString()
  password: string;
}
