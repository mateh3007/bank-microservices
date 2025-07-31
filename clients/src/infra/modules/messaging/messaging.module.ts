import { Module } from '@nestjs/common';
import { MessagingController } from '@presentation/controllers/messaging/messaging.controller';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { RabbitMQConsumerUseCase } from '@application/use-cases/messaging/rabbitmq.consumer.use-case';
import { RabbitMQProducerUseCase } from '@application/use-cases/messaging/rabbitmq.producer.use-case';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [RabbitMQConsumerUseCase, RabbitMQProducerUseCase],
  controllers: [MessagingController],
  exports: [RabbitMQConsumerUseCase, RabbitMQProducerUseCase],
})
export class MessagingModule {}
