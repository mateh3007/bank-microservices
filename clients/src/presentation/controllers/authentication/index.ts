import {
  LoginUseCase,
  LoginUseCaseReturn,
} from '@application/use-cases/authentication/login';
import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login';
import { LoginResponses } from '@presentation/swagger/responses/authentication/login.response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @LoginResponses
  login(@Body() body: LoginDto): LoginUseCaseReturn {
    console.log('Login payload:', body);
    return this.loginUseCase.login(body);
  }
}
