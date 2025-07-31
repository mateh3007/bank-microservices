import { Module } from '@nestjs/common';
import { RabbitMQConsumerUseCase } from '@application/use-cases/messaging/rabbitmq.consumer.use-case';
import { RabbitMQProducerUseCase } from '@application/use-cases/messaging/rabbitmq.producer.use-case';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions';
import { MessagingController } from '@presentation/controllers/messaging/messaging.controller';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [RabbitMQProducerUseCase, RabbitMQConsumerUseCase],
  controllers: [MessagingController],
  exports: [RabbitMQProducerUseCase, RabbitMQConsumerUseCase],
})
export class MessagingModule {}
