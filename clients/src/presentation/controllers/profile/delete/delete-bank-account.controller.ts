import { AuthenticatedRequest } from '@application/use-cases/authentication/route-authentication';
import { DeleteBankAccountUseCase } from '@application/use-cases/profile/delete/delete-bank-account.use-case';
import { Controller, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteBankAccountResponses } from '@presentation/swagger/responses/profile/delete-bank-account.response';

@ApiTags('Profiles')
@Controller('profile')
export class DeleteBankAccountController {
  constructor(
    private readonly deleteBankAccountUseCase: DeleteBankAccountUseCase,
  ) {}

  @Delete('delete')
  @DeleteBankAccountResponses
  async delete(@Req() req: AuthenticatedRequest): Promise<void> {
    return this.deleteBankAccountUseCase.execute(req.client.id);
  }
}
