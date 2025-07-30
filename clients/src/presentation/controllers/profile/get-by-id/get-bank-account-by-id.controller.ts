import { AuthenticatedRequest } from '@application/use-cases/authentication/route-authentication';
import { GetBankAccountByIdUseCase } from '@application/use-cases/bank-account/get-by-id/get-bank-account-by-id.use-case';
import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfileResponses } from '@presentation/swagger/responses/profile/get-profile.response';

@ApiTags('Profiles')
@Controller('profile')
export class GetProfileController {
  constructor(
    private readonly getBankAccountByIdUseCase: GetBankAccountByIdUseCase,
  ) {}

  @Get()
  @GetProfileResponses
  async getById(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetBankAccountByIdReturn | void> {
    return this.getBankAccountByIdUseCase.execute(req.client.id);
  }
}
