import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const UpdateProfileResponses = applyDecorators(
  ApiOkResponse({
    description: 'Alteração de dados bem-sucedida',
  }),
  ApiNotFoundResponse({ description: 'Conta não encontrado' }),
);
