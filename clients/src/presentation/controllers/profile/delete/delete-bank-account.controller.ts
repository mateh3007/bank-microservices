import { DeleteBankAccountUseCase } from '@application/use-cases/profile/delete/delete-bank-account.use-case';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteBankAccountResponses } from '@presentation/swagger/responses/profile/delete-bank-account.response';

@ApiTags('Profiles')
@Controller('profile')
export class DeleteBankAccountController {
  constructor(
    private readonly deleteBankAccountUseCase: DeleteBankAccountUseCase,
  ) {}

  @Delete('delete/:id')
  @DeleteBankAccountResponses
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteBankAccountUseCase.execute(id);
  }
}
