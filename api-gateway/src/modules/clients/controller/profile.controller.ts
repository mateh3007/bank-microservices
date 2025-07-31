import { Patch, Controller, Get, Delete, Body } from '@nestjs/common';
import { ProfileUseCase } from '../use-cases/profiles/profile.use-case';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Client } from 'src/common/decorators/user.decorator';
import { UpdateProfileDto } from './dtos/profiles/update-profile.dto';
import { GetBankAccountByIdReturn } from '../interfaces/bank-account.interface';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileUseCase: ProfileUseCase) {}

  @ApiBearerAuth()
  @Get()
  async getProfile(@Client('clientId') clientId: string) {
    return this.profileUseCase.getProfile(clientId);
  }

  @ApiBearerAuth()
  @Patch()
  async updateProfile(
    @Client('clientId') clientId: string,
    @Body() body: UpdateProfileDto,
  ): Promise<GetBankAccountByIdReturn> {
    return this.profileUseCase.updateProfile(clientId, body);
  }

  @ApiBearerAuth()
  @Delete()
  async delete(@Client('clientId') clientId: string) {
    return this.profileUseCase.deleteProfile(clientId);
  }
}
