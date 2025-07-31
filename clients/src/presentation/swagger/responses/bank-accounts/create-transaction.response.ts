import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const CreateTransactionResponses = applyDecorators(
  ApiCreatedResponse({
    description: 'Account successfully created!',
  }),
  ApiNotFoundResponse({
    description: 'Entity not found, for example, the account was not found.',
  }),
);
