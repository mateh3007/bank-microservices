import { GetBankAccountByIdReturn } from '@domain/interfaces/bank-account.interfaces';
import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

const BANK_ACCOUNT: GetBankAccountByIdReturn = {
  id: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  clientId: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  fullname: 'Jon Doe',
  email: 'jonh@gmail.com',
  registration: '1231231321',
  dateOfBirth: new Date(),
  phone: '12321312321',
  address: {
    id: '32134125252141231',
    street: 'street',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
    neighborhood: 'neighborhood',
    number: 'number',
    complement: 'complement',
  },
  avatarFile: 'avatarFile',
  agency: 'agency',
  accountNumber: '1231242112',
  bankName: 'bankName',
  balance: 'balance',
  createdAt: new Date(),
  updatedAt: new Date(),
};

class GetBankAccountByIdResponseDto {
  @ApiProperty({
    example: BANK_ACCOUNT,
  })
  bankAccount: GetBankAccountByIdReturn;
}

export const GetBankAccountByIdResponses = applyDecorators(
  ApiOkResponse({
    type: GetBankAccountByIdResponseDto,
  }),
  ApiNotFoundResponse({ description: 'Account not found' }),
);
