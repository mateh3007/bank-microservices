import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateBankAccountDto } from './dtos/update-bank-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateBankAccountUseCase } from '@application/use-cases/profile/update/update-bank-account.use-case';
import { UpdateProfileResponses } from '@presentation/swagger/responses/profile/update-bank-account.response';

@ApiTags('Profiles')
@Controller('profile')
export class UpdateBankAccountController {
  constructor(
    private readonly updateBankAccountUseCase: UpdateBankAccountUseCase,
  ) {}

  @Patch('update/:id')
  @UpdateProfileResponses
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateBankAccountDto,
  ): Promise<GetBankAccountByIdReturn | void> {
    return this.updateBankAccountUseCase.execute(id, payload);
  }
}
