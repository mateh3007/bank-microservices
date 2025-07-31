import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { TransactionRepository } from '@domain/repositories/transaction.repository';
import { Injectable, Logger } from '@nestjs/common';

export interface ReceivedTransactionData {
  transactionId: string;
  senderId: string;
  receiverId: string;
  amount: bigint;
  createdAt: Date;
}

@Injectable()
export class RabbitMQConsumerUseCase {
  private readonly logger = new Logger(RabbitMQConsumerUseCase.name);

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async processTransactionEvent(data: ReceivedTransactionData) {
    try {
      this.logger.log('📥 RECEBIDO evento de transação:', data);

      const transaction = await this.transactionRepository.create(data);
      if (!transaction) {
        return this.exceptionsAdapter.internalServerError({
          message: 'Error on create transaction',
        });
      }

      this.logger.log('✅ Evento PROCESSADO com sucesso!');

      return true;
    } catch (error) {
      this.logger.error('❌ ERRO ao processar evento:', error);
      throw error;
    }
  }
}
