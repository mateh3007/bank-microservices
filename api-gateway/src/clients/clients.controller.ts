import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ClientsService } from './clients.service';

@Controller('api/v1')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Public()
  @Get('health-check')
  async healthCheck() {
    return { status: 'ok' };
  }

  @Public()
  @Post('bank-accounts/create')
  async createBankAccount(@Body() payload: any) {
    return await this.clientsService.createBankAccount(payload);
  }

  @Public()
  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() payload: any) {
    return await this.clientsService.login(payload);
  }

  @Get('bank-accounts/bank-details/:id')
  async getBankDetails(@Param('id') id: string) {
    return this.clientsService.getBankDetails(id);
  }

  @Get('bank-accounts/:id')
  async getBankAccount(@Param('id') id: string) {
    return this.clientsService.getBankAccount(id);
  }

  @Get('bank-accounts/verify-exists/:id')
  verifyBankAccountExists(@Param('id') id: string) {
    return this.clientsService.verifyBankAccountExists(id);
  }

  @Patch('profile/update')
  updateProfile(@Body() payload: any) {
    return this.clientsService.updateProfile(payload);
  }

  @Delete('profiles/delete')
  deleteProfile(@Body() payload: any) {
    return this.clientsService.deleteProfile(payload);
  }

  @Get('profile/:id')
  getProfileById(@Param('id') id: string) {
    return this.clientsService.getProfileById(id);
  }
}
