import {
  RabbitMQConsumerUseCase,
  ReceivedTransactionData,
} from '@application/use-cases/messaging/rabbitmq.consumer.use-case';
import { RabbitMQProducerUseCase } from '@application/use-cases/messaging/rabbitmq.producer.use-case';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MessagingController {
  private readonly logger = new Logger(MessagingController.name);

  constructor(
    private rabbitMQConsumerUseCase: RabbitMQConsumerUseCase,
    private readonly rabbitMQProducerUseCase: RabbitMQProducerUseCase,
  ) {}

  @MessagePattern('')
  async receiveTransactionEvent(@Payload() data: ReceivedTransactionData) {
    this.logger.log('🎯 RECEBENDO mensagem: transacao.criada');

    await this.rabbitMQConsumerUseCase.processTransactionEvent(data);
    await this.rabbitMQProducerUseCase.returnFeedbackTransactionEvent(data);
  }
}
