import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const DeleteBankAccountResponses = applyDecorators(
  ApiCreatedResponse({
    description: 'Conta deletada com sucesso!',
  }),
  ApiNotFoundResponse({
    description:
      'Entidade não encontrada, por exemplo, a escola não foi encontrada.',
  }),
);
