import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const DepositResponses = applyDecorators(
  ApiCreatedResponse({
    description: 'Deposit successfully created!',
  }),
  ApiNotFoundResponse({
    description: 'Entity not found, for example, the account was not found.',
  }),
);
