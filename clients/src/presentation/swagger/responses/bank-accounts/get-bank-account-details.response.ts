import { GetBankAccountDetailsReturn } from '@domain/interfaces/bank-account.interfaces';
import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

const BANK_ACCOUNT: GetBankAccountDetailsReturn = {
  id: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  clientId: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  agency: 'agency',
  accountNumber: '1231242112',
  bankName: 'bankName',
  balance: 'balance',
  createdAt: new Date(),
  updatedAt: new Date(),
};

class GetBankAccountDetailsByIdResponseDto {
  @ApiProperty({
    example: BANK_ACCOUNT,
  })
  bankAccount: GetBankAccountDetailsReturn;
}

export const GetBankAccountDetailsByIdResponses = applyDecorators(
  ApiOkResponse({
    type: GetBankAccountDetailsByIdResponseDto,
  }),
  ApiNotFoundResponse({ description: 'Account not found' }),
);
