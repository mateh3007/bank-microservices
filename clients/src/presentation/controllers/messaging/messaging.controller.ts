import {
  RabbitMQConsumerUseCase,
  TransactionEventExpectedReceive,
} from '@application/use-cases/messaging/rabbitmq.consumer.use-case';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MessagingController {
  private readonly logger = new Logger(MessagingController.name);

  constructor(private rabbitMQConsumerService: RabbitMQConsumerUseCase) {}

  @MessagePattern('')
  async receiveTransactionEvent(
    @Payload() payload: TransactionEventExpectedReceive,
  ) {
    this.logger.log('🎯 RECEBENDO mensagem: transacao.criada');
    return await this.rabbitMQConsumerService.processTransactionFeedback(
      payload,
    );
  }
}
