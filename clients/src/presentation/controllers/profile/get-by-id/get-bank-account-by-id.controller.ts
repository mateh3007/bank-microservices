import { GetBankAccountByIdUseCase } from '@application/use-cases/bank-account/get-by-id/get-bank-account-by-id.use-case';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfileResponses } from '@presentation/swagger/responses/profile/get-profile.response';

@ApiTags('Profiles')
@Controller('profiles')
export class GetProfileController {
  constructor(
    private readonly getBankAccountByIdUseCase: GetBankAccountByIdUseCase,
  ) {}

  @Get(':id')
  @GetProfileResponses
  async getById(
    @Param('id') id: string,
  ): Promise<GetBankAccountByIdReturn | void> {
    return this.getBankAccountByIdUseCase.execute(id);
  }
}
