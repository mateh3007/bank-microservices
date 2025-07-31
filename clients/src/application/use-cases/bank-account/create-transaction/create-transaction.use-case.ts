import { RabbitMQProducerUseCase } from '@application/use-cases/messaging/rabbitmq.producer.use-case';
import { ExceptionsAdapter } from '@domain/adapters/exception.adapter';
import { CreateTransactionParams } from '@domain/interfaces/bank-account.interfaces';
import { BankAccountRepository } from '@domain/repositories/bank-account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
    private readonly rabbitmqProducerUseCase: RabbitMQProducerUseCase,
  ) {}

  async execute(params: CreateTransactionParams): Promise<boolean | void> {
    const senderExists = await this.bankAccountRepository.getByClientId(
      params.senderId,
    );

    if (!senderExists) {
      return this.exceptionsAdapter.notFound({
        message: 'Sender not founded',
      });
    }

    const receiverExists = await this.bankAccountRepository.getByClientId(
      params.receiverId,
    );

    if (!receiverExists) {
      return this.exceptionsAdapter.notFound({
        message: 'Receiver not founded',
      });
    }

    if (params.amount > Number(senderExists.balance)) {
      return this.exceptionsAdapter.badRequest({
        message: 'Insufficient Funds',
      });
    }
    try {
      await this.rabbitmqProducerUseCase.transactionEvent(params);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
