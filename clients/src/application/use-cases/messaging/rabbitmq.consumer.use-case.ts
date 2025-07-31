import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable, Logger } from '@nestjs/common';

export interface TransactionEventExpectedReceive {
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
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async processTransactionFeedback(data: TransactionEventExpectedReceive) {
    try {
      this.logger.log('📥 RECEBIDO evento de transação');

      const receiverAddFundsRes = await this.bankAccountRepository.addFunds(
        data.receiverId,
        data.amount,
      );
      if (!receiverAddFundsRes) {
        return this.exceptionsAdapter.notFound({
          message: 'Receiver account not founded',
        });
      }

      const senderRemoveFundsRes = await this.bankAccountRepository.removeFunds(
        data.senderId,
        data.amount,
      );
      if (!senderRemoveFundsRes) {
        return this.exceptionsAdapter.notFound({
          message: 'Sender account not founded',
        });
      }

      this.logger.log('✅ Evento PROCESSADO com sucesso!');
      return { success: true };
    } catch (error) {
      this.logger.error('❌ ERRO ao processar evento:', error);
      throw error;
    }
  }
}
