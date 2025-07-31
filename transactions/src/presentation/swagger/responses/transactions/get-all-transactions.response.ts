import { TransactionEntity } from '@domain/entities/transaction.entity';
import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { TransactionStatus } from '@prisma/client';

const TRANSACTION: TransactionEntity = {
  id: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  senderId: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  receiverId: '9e003b04-4cf3-42f5-b9c0-232fe428e320',
  amount: 100,
  status: TransactionStatus.pending,
  createdAt: new Date(),
  updatedAt: new Date(),
};

class GetAllTransactionsResponseDto {
  @ApiProperty({
    example: TRANSACTION,
  })
  transactions: TransactionEntity[];
}

export const GetAllTransactionsResponses = applyDecorators(
  ApiOkResponse({
    type: GetAllTransactionsResponseDto,
  }),
  ApiNotFoundResponse({ description: 'Account not found' }),
);
